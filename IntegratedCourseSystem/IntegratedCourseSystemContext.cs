﻿using Microsoft.EntityFrameworkCore;
using DataBase.Models;
using System;
using System.Linq;
using System.Reflection;

#nullable disable

namespace IntegratedCourseSystem
{
    public partial class IntegratedCourseSystemContext : DbContext
    {
        public IntegratedCourseSystemContext()
        {
        }

        public IntegratedCourseSystemContext(DbContextOptions<IntegratedCourseSystemContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<ClassRole> ClassRoles { get; set; }
        public virtual DbSet<ClassTech> ClassTeches { get; set; }
        public virtual DbSet<ClassSubject> ClassSubjects { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Faculty> Faculties { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<GroupTech> GroupTechs { get; set; }
        public virtual DbSet<Questionnaire> Questionnaires { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RolePreference> RolePreferences { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<StudentGroup> StudentGroups { get; set; }
        public virtual DbSet<StudentRolePeriod> StudentRolePeriods { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<SubjectQuestionnaire> SubjectQuestionnaires { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; }
        public virtual DbSet<TeammateAntipreference> TeammateAntipreferences { get; set; }
        public virtual DbSet<TeammatePreference> TeammatePreferences { get; set; }
        public virtual DbSet<Tech> Techs { get; set; }
        public virtual DbSet<TechPreference> TechPreferences { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=ec2-54-155-208-5.eu-west-1.compute.amazonaws.com;Database=deu49mt0hfgpv4;Username=daeiflehxkiucl;Password=38cfb2ed1aff1b25206dee87c4214609dbb4579a15e1c7fb5181dc4f624f6906;Port=5432;SSL Mode=Prefer;Trust Server Certificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "en_US.UTF-8");

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("admins");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Admin)
                    .HasForeignKey<Admin>(d => d.Id)
                    .HasConstraintName("admins_id_fkey");
            });

            modelBuilder.Entity<Class>(entity =>
            {
                entity.ToTable("classes");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.InviteCode)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("invitecode");

                entity.Property(e => e.MaxCapacity).HasColumnName("maxcapacity");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.TeacherId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("teacherid");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.Classes)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("classes_teacherid_fkey");
            });

            modelBuilder.Entity<ClassSubject>(entity =>
            {
                entity.ToTable("classsubjects");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ClassId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("classid");

                entity.Property(e => e.SubjectId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("subjectid");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.ClassSubjects)
                    .HasForeignKey(d => d.ClassId)
                    .HasConstraintName("classsubjects_classid_fkey");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.ClassSubjects)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("classsubjects_subjectid_fkey");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comments");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.TaskId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("taskid");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text");

                entity.Property(e => e.UserId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("userid");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("comments_taskid_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("comments_userid_fkey");
            });

            modelBuilder.Entity<Faculty>(entity =>
            {
                entity.ToTable("faculties");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("groups");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Classid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("classid");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.Classid)
                    .HasConstraintName("groups_classid_fkey");
            });

            modelBuilder.Entity<GroupTech>(entity =>
            {
                entity.ToTable("grouptechs");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Groupid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("groupid");

                entity.Property(e => e.Techid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("techid");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Groupteches)
                    .HasForeignKey(d => d.Groupid)
                    .HasConstraintName("grouptechs_groupid_fkey");

                entity.HasOne(d => d.Tech)
                    .WithMany(p => p.GroupTeches)
                    .HasForeignKey(d => d.Techid)
                    .HasConstraintName("grouptechs_techid_fkey");
            });

            modelBuilder.Entity<Questionnaire>(entity =>
            {
                entity.ToTable("questionnaires");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ClassId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("classid");

                entity.Property(e => e.StudentId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("studentid");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Questionnaires)
                    .HasForeignKey(d => d.ClassId)
                    .HasConstraintName("questionnaires_classid_fkey");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Questionnaires)
                    .HasForeignKey(d => d.StudentId)
                    .HasConstraintName("questionnaires_studentid_fkey");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<RolePreference>(entity =>
            {
                entity.ToTable("rolepreferences");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PreferenceLevel).HasColumnName("preferencelevel");

                entity.Property(e => e.QuestionnaireId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("questionnaireid");

                entity.Property(e => e.RoleId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("roleid");

                entity.HasOne(d => d.Questionnaire)
                    .WithMany(p => p.RolePreferences)
                    .HasForeignKey(d => d.QuestionnaireId)
                    .HasConstraintName("rolepreferences_questionnaireid_fkey");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolePreferences)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("rolepreferences_roleid_fkey");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("students");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("surname");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Student)
                    .HasForeignKey<Student>(d => d.Id)
                    .HasConstraintName("students_id_fkey");
            });

            modelBuilder.Entity<StudentGroup>(entity =>
            {
                entity.ToTable("studentgroups");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GroupId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("groupid");

                entity.Property(e => e.StudentId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("studentid");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Studentgroups)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("studentgroups_groupid_fkey");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.StudentGroups)
                    .HasForeignKey(d => d.StudentId)
                    .HasConstraintName("studentgroups_studentid_fkey");
            });

            modelBuilder.Entity<StudentRolePeriod>(entity =>
            {
                entity.ToTable("studentroleperiods");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ending)
                    .HasColumnType("date")
                    .HasColumnName("dateend");

                entity.Property(e => e.Beginning)
                    .HasColumnType("date")
                    .HasColumnName("datestart");

                entity.Property(e => e.QuestionnaireId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("questionnaireid");

                entity.Property(e => e.RoleId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("roleid");

                entity.HasOne(d => d.Questionnaire)
                    .WithMany(p => p.StudentRolePeriods)
                    .HasForeignKey(d => d.QuestionnaireId)
                    .HasConstraintName("studentroleperiods_questionnaireid_fkey");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.StudentRolePeriods)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("studentroleperiods_roleid_fkey");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.ToTable("subjects");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<SubjectQuestionnaire>(entity =>
            {
                entity.ToTable("subjectquestionnaires");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ClassSubjectId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("classsubjectid");

                entity.Property(e => e.QuestionnaireId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("questionnaireid");

                entity.HasOne(d => d.ClassSubject)
                    .WithMany(p => p.SubjectQuestionnaires)
                    .HasForeignKey(d => d.ClassSubjectId)
                    .HasConstraintName("subjectquestionnaires_classsubjectid_fkey");

                entity.HasOne(d => d.Questionnaire)
                    .WithMany(p => p.SubjectQuestionnaires)
                    .HasForeignKey(d => d.QuestionnaireId)
                    .HasConstraintName("subjectquestionnaires_questionnaireid_fkey");
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("tasks");

                entity.Property(e => e.Id).HasColumnName("id");

                //entity.Property(e => e.ActualGrade).HasColumnName("actualgrade");

                /*entity.Property(e => e.ClassSubjectId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("classsubjectid");
                */

                entity.Property(e => e.DeadLine).HasColumnName("deadline");

                entity.Property(e => e.Done).HasColumnName("done");

                entity.Property(e => e.GroupId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("groupid");

                //entity.Property(e => e.MaxGrade).HasColumnName("maxgrade");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Posted).HasColumnName("posted");

                entity.Property(e => e.TaskDescription).HasColumnName("taskdescription");

                /*
                entity.HasOne(d => d.ClassSubject)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.ClassSubjectId)
                    .HasConstraintName("tasks_classsubjectid_fkey");
                */

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("tasks_groupid_fkey");
            });

            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.ToTable("teachers");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.FacultyId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("facultyid");

                entity.Property(e => e.IsVerified).HasColumnName("isverified");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("surname");

                entity.HasOne(d => d.Faculty)
                    .WithMany(p => p.Teachers)
                    .HasForeignKey(d => d.FacultyId)
                    .HasConstraintName("teachers_facultyid_fkey");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Teacher)
                    .HasForeignKey<Teacher>(d => d.Id)
                    .HasConstraintName("teachers_id_fkey");
            });

            modelBuilder.Entity<TeammateAntipreference>(entity =>
            {
                entity.ToTable("teammateantipreferences");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EnemyId1)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("enemyid1");

                entity.Property(e => e.EnemyId2)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("enemyid2");

                entity.Property(e => e.EnemyId3)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("enemyid3");

                entity.Property(e => e.InitiatorId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("initiatorid");

                entity.HasOne(d => d.Enemy1)
                    .WithMany(p => p.WhereEnemy1)
                    .HasForeignKey(d => d.EnemyId1)
                    .HasConstraintName("teammateantipreferences_enemyid1_fkey");

                entity.HasOne(d => d.Enemy2)
                    .WithMany(p => p.WhereEnemy2)
                    .HasForeignKey(d => d.EnemyId2)
                    .HasConstraintName("teammateantipreferences_enemyid2_fkey");

                entity.HasOne(d => d.Enemy3)
                    .WithMany(p => p.WhereEnemy3)
                    .HasForeignKey(d => d.EnemyId3)
                    .HasConstraintName("teammateantipreferences_enemyid3_fkey");

                entity.HasOne(d => d.Initiator)
                    .WithMany(p => p.TeammateAntipreferences)
                    .HasForeignKey(d => d.InitiatorId)
                    .HasConstraintName("teammateantipreferences_initiatorid_fkey");
            });

            modelBuilder.Entity<TeammatePreference>(entity =>
            {
                entity.ToTable("teammatepreferences");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FriendId1)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("friendid1");

                entity.Property(e => e.FriendId2)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("friendid2");

                entity.Property(e => e.FriendId3)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("friendid3");

                entity.Property(e => e.InitiatorId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("initiatorid");

                entity.HasOne(d => d.Friend1)
                    .WithMany(p => p.WhereFriend1)
                    .HasForeignKey(d => d.FriendId1)
                    .HasConstraintName("teammatepreferences_friendid1_fkey");

                entity.HasOne(d => d.Friend2)
                    .WithMany(p => p.WhereFriend2)
                    .HasForeignKey(d => d.FriendId2)
                    .HasConstraintName("teammatepreferences_friendid2_fkey");

                entity.HasOne(d => d.Friend3)
                    .WithMany(p => p.WhereFriend3)
                    .HasForeignKey(d => d.FriendId3)
                    .HasConstraintName("teammatepreferences_friendid3_fkey");

                entity.HasOne(d => d.Initiator)
                    .WithMany(p => p.TeammatePreferences)
                    .HasForeignKey(d => d.InitiatorId)
                    .HasConstraintName("teammatepreferences_initiatorid_fkey");
            });

            modelBuilder.Entity<Tech>(entity =>
            {
                entity.ToTable("techs");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<TechPreference>(entity =>
            {
                entity.ToTable("techpreferences");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PreferenceLevel).HasColumnName("preferencelevel");

                entity.Property(e => e.QuestionnaireId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("questionnaireid");

                entity.Property(e => e.TechId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("techid");

                entity.HasOne(d => d.Questionnaire)
                    .WithMany(p => p.TechPreferences)
                    .HasForeignKey(d => d.QuestionnaireId)
                    .HasConstraintName("techpreferences_questionnaireid_fkey");

                entity.HasOne(d => d.Tech)
                    .WithMany(p => p.TechPreferences)
                    .HasForeignKey(d => d.TechId)
                    .HasConstraintName("techpreferences_techid_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("login");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .HasColumnName("role")
                    .HasConversion<int>();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        

        public DbSet<DataBase.Models.SubjectTask> SubjectTask { get; set; }
    }
}
