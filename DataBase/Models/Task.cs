using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

#nullable disable

namespace DataBase.Models
{
    public partial class Task
    {
        public Task()
        {
            Comments = new HashSet<Comment>();
            SubjectTasks = new HashSet<SubjectTask>();
        }

        public int Id { get; set; }
        public int GroupId { get; set; }
        public string Name { get; set; }
        public string TaskDescription { get; set; }
        public DateTime? DeadLine { get; set; }
        public DateTime Posted { get; set; }
        public DateTime? Done { get; set; }

        
        public virtual Group Group { get; set; }
        public virtual ICollection<SubjectTask> SubjectTasks { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
