using System;
using System.Collections.Generic;
using System.Linq;

namespace iTSoft.CRM.Core.Helpers
{
    public static class EnumHelper
    {
        public static IEnumerable<T> GetValues<T>() 
        {
            return Enum.GetValues(typeof(T)).Cast<T>();
        }

        public static T GetEnum<T>(int val)
        {
            return (T)Enum.ToObject(typeof(T), val);
        }

    }
}
