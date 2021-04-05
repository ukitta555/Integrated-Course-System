using DataBase.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GeneticAlgorithm
{
    public class GroupWithQuestionnaires
    {
        public List<Student> students = new List<Student>();
        public List<Tech> techs = new List<Tech>();
        public List<Questionnaire> questionnaires = new List<Questionnaire>();
        public GroupWithQuestionnaires() { }
        public GroupWithQuestionnaires(IEnumerable<Questionnaire> _questionnaires)
        {
            students = _questionnaires.Select(q => q.Student).ToList();
            techs = _questionnaires.SelectMany(q => q.TechPreferences.Select(tp => tp.Tech)).ToHashSet().ToList();
            questionnaires = _questionnaires.ToList();
        }

        public GroupWithQuestionnaires(GroupWithQuestionnaires other)
        {
            foreach(var s in other.students) {
                students.Add(s);
            }
            foreach (var t in other.techs) {
                techs.Add(t);
            }
            foreach (var q in other.questionnaires) {
                questionnaires.Add(q);
            }
        }

        public bool AddStudentFromQuestionnaire(Questionnaire q)
        {
            if (this.students.Contains(q.Student))
                return false;
            students.Add(q.Student);
            questionnaires.Add(q);
            return true;
        }

        public void RemoveStudentAt(int id)
        {
            students.RemoveAt(id);
            questionnaires.RemoveAt(id);
        }

        public bool RemoveStudent(Student student)
        {
            return students.Remove(student) && (questionnaires.RemoveAll(q => q.Student == student) == 1);
        }

        public void ExchangeStudents(GroupWithQuestionnaires other, int studentId)
        {
            var stud = other.students.ElementAt(studentId);
            other.students.RemoveAt(studentId);
            other.questionnaires.RemoveAt(studentId);
            this.students.Add(stud);
            this.questionnaires.Add(other.questionnaires.ElementAt(studentId));
        }
        public override string ToString()
        {
            var res = "";
            students.ForEach(s => res += s.Name + " ");
            return res;
        }

        public Group ToDbGroup(Class c, int groupNumber)
        {

            Group res = new Group(){ Classid = c.Id, Name = $"Group {groupNumber}" };
            Console.WriteLine("____________");
            foreach (var st in students)
            {
                Console.WriteLine(st.Name);
                res.Studentgroups.Add(new StudentGroup() { StudentId = st.Id});
            }
            foreach(var tech in techs)
            {
                res.Groupteches.Add(new GroupTech() { Techid = tech.Id});
            }
            return res;
        }
    }
}
