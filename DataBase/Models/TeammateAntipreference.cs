using System;
using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class TeammateAntipreference
    {
        public int Id { get; set; }
        public int InitiatorId { get; set; }
        public int EnemyId1 { get; set; }
        public int EnemyId2 { get; set; }
        public int EnemyId3 { get; set; }

        public virtual Student Enemy1 { get; set; }
        public virtual Student Enemy2 { get; set; }
        public virtual Student Enemy3 { get; set; }
        public virtual Questionnaire Initiator { get; set; }
    }
}
