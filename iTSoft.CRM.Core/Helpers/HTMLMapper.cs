using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Text;

namespace iTSoft.CRM.Core.Helpers
{
    public class HTMLMapper : MapperBase
    {

        public string MapHTML<T>(T rawData ,string htmlTemplateData)
        {

            PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
            foreach (PropertyDescriptor propertyInfo in properties)
            {
                InputDetails inputDetails = base.GetPropertyInfo<T>(rawData, propertyInfo.Name);
                if (inputDetails != null)
                {
                    if (inputDetails.Value is IList)
                    {
                        int detailStartIndex = htmlTemplateData.IndexOf("<tr class=\"detailRow\">");
                        int detailEndIndex = htmlTemplateData.IndexOf("</tr",detailStartIndex);

                        string originalDetailsRowString = string.Empty;
                        string tableData = string.Empty;
                        
                        DataTable results = ToDataTable(inputDetails.Value, string.Empty);
                        if (results != null)
                        {
                            foreach (DataRow row in results.Rows)
                            {
                                string rowData = originalDetailsRowString;
                                foreach(DataColumn column in results.Columns)
                                {
                                    string val = Convert.ToString(row[column.ColumnName]);
                                    htmlTemplateData.Replace("{{" + column.ColumnName + "}}", val);
                                }
                                tableData += rowData;
                            }
                        }

                        tableData.Remove(detailStartIndex, detailEndIndex - detailStartIndex);
                        tableData.Insert(detailStartIndex, tableData);

                    }
                    else
                    {
                        htmlTemplateData = htmlTemplateData.Replace("{{" + inputDetails.InputProperty.Name + "}}", Convert.ToString(inputDetails.Value));
                    }
                }
            }
             return htmlTemplateData;
        }

    }
}
