﻿namespace Paper.Api.Models
{
    public class PaperModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = "" ;
        public string Texture { get; set; } = "";
        public string Grammage { get; set; } = "";
        public string Color { get; set; } = ""; 
    }
}
