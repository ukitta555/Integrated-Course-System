﻿using System;
using System.Collections.Generic;
using System.Text;

namespace GeneticAlgorithm
{
    public static class Extensions
    {
        //private static Random rng = new Random();

        public static void Shuffle<T>(this IList<T> list, Random rng)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }

        public static T RandomElement<T>(this IList<T> collection, Random rng)
        {
            return collection[rng.Next(collection.Count)];
        }
    }
}
