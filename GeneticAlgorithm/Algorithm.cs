using DataBase.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace GeneticAlgorithm
{
    public class Algorithm
    {
        private int populationSize = 40;
        private int toNextGen = 2;
        private double mutationProb = 0.1;
        private List<Tech> techs;

        private List<Questionnaire> questionnaires;
        private List<Student> students;

        public Algorithm(IEnumerable<Questionnaire> questionnaires)
        {
            this.questionnaires = questionnaires.ToList();
            this.techs = questionnaires.SelectMany(q => q.TechPreferences.Select(tp => tp.Tech)).ToHashSet().ToList();
            this.students = questionnaires.Select(q => q.Student).ToList();
        }

        private readonly Random rng = new Random();
        private List<Chromosome> Population;
        private int minStudentsInGroup = 2;
        private int maxStudentsInGroup = 3;
        public List<Chromosome> RandomInitialize(List<Questionnaire> questionnaires)
        {
            questionnaires.Shuffle(rng);
            var randomPopulation = new List<Chromosome>();
            for (int chromoNumber = 0; chromoNumber < populationSize; chromoNumber++)
            {
                var chromosome = new Chromosome();
                for (int i = 0; i < questionnaires.Count; i += maxStudentsInGroup)
                {
                    chromosome.Groups.Add(new GroupWithQuestionnaires(
                        questionnaires.GetRange(i, Math.Min(maxStudentsInGroup, questionnaires.Count - i))));
                }
                randomPopulation.Add(chromosome);
            }
            return randomPopulation;
        }
        private List<Chromosome> SelectForReproduction()
        {
            double minFitness = Population.Min().Fitness;
            double toAdd = minFitness < 0 ? minFitness : 0;
            double sumFitness = Population.Select(x => x.Fitness + toAdd).Sum();
            var wheel = new List<Tuple<double, Chromosome>>();
            foreach (var s in Population)
            {
                wheel.Add(new Tuple<double, Chromosome>((s.Fitness + toAdd) / sumFitness, s));
            }
            var parents = new List<Chromosome>();
            for (int i = 0; i < (Population.Count - toNextGen) * 2; i++)
            {
                var d = rng.NextDouble();
                var upper = 0.0;
                for (int j = 0; j < wheel.Count; j++)
                {
                    upper += wheel[j].Item1;
                    if (d < upper)
                    {
                        parents.Add(wheel[j].Item2);
                        break;
                    }
                }
            }
            return parents;
        }

        public List<Chromosome> Crossover(List<Chromosome> parents)
        {
            var children = new List<Chromosome>();
            for (int pairIndex = 0; pairIndex < parents.Count - 1; pairIndex += 2)
            {
                var child = new Chromosome();
                var parentFirst = parents[pairIndex];
                var parentSecond = parents[pairIndex + 1];
                var assignedStudents = new HashSet<Student>();
                foreach(var group in parentFirst.Groups)
                {
                    child.Groups.Add(new GroupWithQuestionnaires(group));
                }
                foreach(var student in students)
                {
                    if (rng.NextDouble() < 0.5)
                    {
                        var groupIndexCurrent = child.Groups.IndexOf(child.Groups.First(g => g.students.Contains(student)));
                        var groupIndexInSecond = parentSecond.Groups.IndexOf(parentSecond.Groups.First(g => g.students.Contains(student)));
                        child.Groups[groupIndexCurrent].RemoveStudent(student);
                        child.Groups[groupIndexInSecond].AddStudentFromQuestionnaire(questionnaires.First(q => q.Student == student));
                        //child.Groups[groupIndexInSecond].students.Add(student);
                        //child.Groups[groupIndexInSecond].questionnaires.Add(questionnaires.First(q => q.Student == student));
                    }
                }
                for (int gi = 0; gi < parentFirst.Groups.Count; gi++)
                {
                    var firstParentGroup = parentFirst.Groups[gi];
                    var secondParentGroup = parentSecond.Groups[gi];
                    var newTechs = new List<Tech>();
                    var lastStudentIndexF = 0;
                    var lastStudentIndexS = 0;
                    var lastTechIndexF = 0;
                    var lastTechIndexS = 0;
                    for (int ti = 0; ti < Math.Max(firstParentGroup.techs.Count, secondParentGroup.techs.Count); ti++)
                    {
                        if (rng.NextDouble() < 0.5 || lastTechIndexF < firstParentGroup.techs.Count)
                        {
                            if (lastTechIndexS < secondParentGroup.techs.Count)
                            {
                                newTechs.Add(secondParentGroup.techs[lastTechIndexS]);
                                lastTechIndexS++;
                            }
                        }
                        else if (lastTechIndexF < firstParentGroup.techs.Count)
                        {
                            newTechs.Add(firstParentGroup.techs[lastTechIndexF]);
                            lastTechIndexF++;
                        }
                    }
                    newTechs = newTechs.ToHashSet().ToList();
                    child.Groups[gi].techs = newTechs;
                }
                children.Add(child);
            }
            return children;
        }
        public void Mutate(Chromosome chromosome)
        {
            foreach (var mutatedGroup in chromosome.Groups)
            {
                if (rng.NextDouble() < mutationProb)
                {
                    if (rng.NextDouble() < 0.5 && mutatedGroup.techs.Count > 1)
                    {
                        mutatedGroup.techs.RemoveAt(rng.Next(mutatedGroup.techs.Count));
                        //group.techs[rng.Next(group.techs.Count)] = techs[rng.Next(techs.Count)];
                    }
                    else
                    {
                        var newTech = techs.RandomElement(rng);
                        mutatedGroup.techs.Add(newTech);
                        mutatedGroup.techs = mutatedGroup.techs.ToHashSet().ToList();
                    }
                }

                else if (rng.NextDouble() < mutationProb)
                {
                    if (rng.NextDouble() < 0.5 && mutatedGroup.students.Count < maxStudentsInGroup)
                    {
                        var groupsAboveMin = chromosome.Groups.Where(g => g.students.Count > minStudentsInGroup && g!= mutatedGroup).ToList();
                        var groupToExchangeWith = groupsAboveMin.RandomElement(rng);
                        var studentToExchangeIndex = rng.Next(groupToExchangeWith.students.Count);
                        var studentToExchange = groupToExchangeWith.students[studentToExchangeIndex];
                        mutatedGroup.AddStudentFromQuestionnaire(groupToExchangeWith.questionnaires[studentToExchangeIndex]);
                        groupToExchangeWith.RemoveStudent(studentToExchange);
                    }
                    else
                    {
                        var groupToExchangeWith = chromosome.Groups.RandomElement(rng);
                        var newStudent = groupToExchangeWith.students.RandomElement(rng);
                        var newQuestionnaire = groupToExchangeWith.questionnaires.First(q => q.Student == newStudent);
                        var oldStudent = mutatedGroup.students[rng.Next(mutatedGroup.students.Count)];
                        var oldQuestionnaire = mutatedGroup.questionnaires.First(q => q.Student == oldStudent);
                        mutatedGroup.students.Remove(oldStudent);
                        mutatedGroup.questionnaires.Remove(oldQuestionnaire);
                        mutatedGroup.students.Add(newStudent);
                        mutatedGroup.questionnaires.Add(newQuestionnaire);
                        groupToExchangeWith.students.Remove(newStudent);
                        groupToExchangeWith.questionnaires.Remove(newQuestionnaire);
                        groupToExchangeWith.students.Add(oldStudent);
                        groupToExchangeWith.questionnaires.Add(oldQuestionnaire);
                    }
                }
            }
        }

        public void Fix(Chromosome chromosome)
        {
            foreach (var groupToFix in chromosome.Groups)
            {
                while(groupToFix.students.Count > maxStudentsInGroup)
                {
                    var groupsBySizeAsc = chromosome.Groups.OrderBy(g => g.students.Count).ToList();
                    var studentToGive = groupToFix.students[rng.Next(groupToFix.students.Count)];
                    var qToGive = groupToFix.questionnaires.First(q => q.Student == studentToGive);
                    groupToFix.RemoveStudent(studentToGive);
                    groupsBySizeAsc[0].AddStudentFromQuestionnaire(qToGive);
                }
                while (groupToFix.students.Count < minStudentsInGroup)
                {
                    var populatedGroups = chromosome.Groups.Where(g => g.students.Count > minStudentsInGroup);
                    if (populatedGroups.Count() == 0)
                    {
                        throw new Exception("Not enough students to form groups!");
                    }
                    var groupToTakeFrom = populatedGroups.ElementAt(rng.Next(populatedGroups.Count()));
                    var newStudent = groupToTakeFrom.students.First(s => !groupToFix.students.Contains(s));
                    var newQuestionnaire = groupToTakeFrom.questionnaires.First(q => q.Student == newStudent);
                    groupToTakeFrom.RemoveStudent(newStudent);
                    groupToFix.AddStudentFromQuestionnaire(newQuestionnaire);
                }
            }
        }

        public List<Group> Run()
        {
            Population = RandomInitialize(questionnaires);
            foreach(var c in Population)
            {
                Fix(c);
            }
            for(int gen=0; gen < 200; gen++)
            {
                var parents = SelectForReproduction();
                var children = Crossover(parents);
                foreach (var ch in children)
                {
                    Fix(ch);
                }
                foreach (var child in children)
                {
                    Mutate(child);
                }
                Population.Sort();
                for(int i = 0; i < populationSize - toNextGen; i++)
                {
                    Population[i] = children[i];
                }
            }
            List<Group> res = new List<Group>();
            foreach(var group in Population.Max().Groups)
            {
                res.Add(group.ToDbGroup());
            }
            return res;
        }
    }
}
