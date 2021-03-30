using System;
using System.Collections.Generic;
using System.Linq;

namespace GeneticAlgorithm
{
    public class Chromosome : IComparable
    { 
        public List<GroupWithQuestionnaires> Groups = new List<GroupWithQuestionnaires>();
        public double Fitness {
            get
            {
                double fitness = 0;
                foreach (var group in Groups)
                {
                    foreach (var q in group.questionnaires)
                    {
                        foreach (var techPref in q.TechPreferences.Where(
                            tp => group.techs.Contains(tp.Tech)))
                        {
                            if (techPref.PreferenceLevel > 0)
                                fitness += 10;
                            if (techPref.PreferenceLevel < 0)
                                fitness -= 25;
                        }
                        if (group.techs.Count < 2)
                            fitness -= 1000;
                        fitness -= (Math.Abs(group.techs.Count - group.students.Count ) - 1)* 100;
                        foreach (var teamPref in q.TeammatePreferences.Where(teamPref =>
                             group.students.Contains(teamPref.Initiator.Student) && (
                             group.students.Contains(teamPref.Friend1) ||
                             group.students.Contains(teamPref.Friend2) ||
                             group.students.Contains(teamPref.Friend3)
                             ))
                            )
                        {
                            fitness += 10;
                        }
                        foreach (var teamAntiPref in q.TeammateAntipreferences.Where(teamAntiPref =>
                             group.students.Contains(teamAntiPref.Initiator.Student) && (
                             group.students.Contains(teamAntiPref.Enemy1) ||
                             group.students.Contains(teamAntiPref.Enemy2) ||
                             group.students.Contains(teamAntiPref.Enemy3)
                             )
                            ))
                        {
                            fitness -= 20;
                        }
                    }
                }
                return fitness;
            }
        }

        public int CompareTo(object obj)
        {
            if (obj == null)
                throw new ArgumentNullException();
            if (!(obj is Chromosome objAsCh))
                throw new ArgumentException();
            return Fitness.CompareTo(objAsCh.Fitness);
        }
    }
}
