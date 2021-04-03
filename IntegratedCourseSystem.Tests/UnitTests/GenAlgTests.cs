using DataBase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace GeneticAlgorithm
{
    public class GenAlgTestClass
    {
        [Fact]
        public void Test()
        {
            var techJS = new Tech() { Name = "JS" };
            var techCPP = new Tech() { Name = "C++" };
            var techjava = new Tech() { Name = "Java" };
            var techsharp = new Tech() { Name = "C#" };
            var technode = new Tech() { Name = "Node .JS" };
            var techHS = new Tech() { Name = "Haskell" };
            var techjs1 = new TechPreference() { Tech = techJS, PreferenceLevel = 1 };
            var techcpp1 = new TechPreference() { Tech = techCPP, PreferenceLevel = 1 };
            var techidk1 = new TechPreference() { Tech = techjava, PreferenceLevel = 0 };
            var techidk2 = new TechPreference() { Tech = techsharp, PreferenceLevel = 0 };
            var techidk3 = new TechPreference() { Tech = technode, PreferenceLevel = 0 };
            var techhs1 = new TechPreference() { Tech = techHS, PreferenceLevel = 1 };
            var techjs0 = new TechPreference() { Tech = techJS, PreferenceLevel = -1 };
            var techcpp0 = new TechPreference() { Tech = techCPP, PreferenceLevel = -1 };
            var techhs0 = new TechPreference() { Tech = techHS, PreferenceLevel = -1 };
            var a = new Student() { Name = "a" };
            var b = new Student() { Name = "b" };
            var c = new Student() { Name = "c" };
            var d = new Student() { Name = "d" };
            var e = new Student() { Name = "e" };
            var f = new Student() { Name = "f" };
            var g = new Student() { Name = "g" };
            var h = new Student() { Name = "h" };
            var qs = new List<Questionnaire>
            {
                new Questionnaire {Student = a, TechPreferences= {techjs1, techcpp1, techhs1, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = b, TechPreferences= {techjs1, techcpp1, techhs1, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = c, TechPreferences= {techjs1, techcpp0, techhs1, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = d, TechPreferences= {techjs1, techcpp1, techhs1, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = e, TechPreferences= {techjs1, techcpp1, techhs1, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student =f, TechPreferences= {techjs0, techcpp0, techhs0, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = g, TechPreferences= {techjs0, techcpp1, techhs0, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = h, TechPreferences= {techjs0, techcpp0, techhs0, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = new Student {Name = "i"}, TechPreferences= {techjs0, techcpp1, techhs0, techidk1, techidk2, techidk3 } },
                new Questionnaire {Student = new Student {Name = "j"}, TechPreferences= {techjs0, techcpp0, techhs0, techidk1, techidk2, techidk3 } },
            };
            qs[3].TeammatePreferences.Add(new TeammatePreference { Initiator = qs[3], Friend1 = a, Friend2 = b, Friend3 = c });
            qs[7].TeammateAntipreferences.Add(new TeammateAntipreference { Initiator = qs[7], Enemy1=e, Enemy2= f, Enemy3= g });
            var alg = new Algorithm(qs, 4, 5);
            var res = alg.Run(new Class { Id = 0});
            Assert.Equal(10,res.SelectMany(gr => gr.Studentgroups.Select(sg => sg.Student).ToList()).Count());
        }
    }
}
