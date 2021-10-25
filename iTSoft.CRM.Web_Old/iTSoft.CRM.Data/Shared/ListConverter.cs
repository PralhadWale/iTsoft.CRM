using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace iTSoft.CRM.Data.Shared
{
    public class ListConverter
    {
        public DataTable ToDataTable<T>(List<T> items, bool convertDate = true)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                dataTable.Columns.Add(prop.Name);
            }
            if (items != null)
            {
                foreach (T item in items)
                {
                    var values = new object[Props.Length];
                    for (int i = 0; i < Props.Length; i++)
                    {
                        //inserting property values to datatable rows

                        Type t = Props[i].PropertyType;
                        if (t == typeof(System.DateTime) || t == typeof(System.DateTime?))
                        {
                            DateTime? value = (DateTime?)Props[i].GetValue(item, null);
                            if (value != null)
                                values[i] = value.GetValueOrDefault().ToString("dd-MMM-yyyy HH:mm");
                        }
                        else
                        {
                            values[i] = Props[i].GetValue(item, null);
                        }
                    }
                    dataTable.Rows.Add(values);
                }
            }
            return dataTable;
        }

        public DataTable ToDataTable<T>(IList lSection)
        {
            throw new NotImplementedException();
        }
    }
}
