using iText.Html2pdf;
using iText.Kernel.Pdf;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Text;

namespace iTSoft.CRM.Core.Helpers
{
    public class HTMLMapper : MapperBase
    {

        public MemoryStream ToPDF<T>(T rawData ,string htmlTemplateData)
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
                        int detailEndIndex = htmlTemplateData.IndexOf("</tr",detailStartIndex) + 5;

                        string originalDetailsRowString = htmlTemplateData.Substring(detailStartIndex, detailEndIndex - detailStartIndex); ;
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
                                    if (val != null)
                                    {
                                        val = val.Replace(Environment.NewLine, "</br>");
                                    }
                                    rowData = rowData.Replace("{{" + column.ColumnName + "}}", val);
                                }
                                tableData += rowData;
                            }
                        }

                       htmlTemplateData = htmlTemplateData.Remove(detailStartIndex, detailEndIndex - detailStartIndex);
                        htmlTemplateData = htmlTemplateData.Insert(detailStartIndex, tableData);

                    }
                    else
                    {
                        string val = Convert.ToString(inputDetails.Value);
                        if (val != null)
                        {
                            val = val.Replace(Environment.NewLine, "</br>");
                        }
                        htmlTemplateData = htmlTemplateData.Replace("{{" + inputDetails.InputProperty.Name + "}}", val);
                    }
                }
            }

            var workStream = new MemoryStream();
            using (var pdfWriter = new PdfWriter(workStream))
            {
                pdfWriter.SetCloseStream(false);
                using (var document = HtmlConverter.ConvertToDocument(htmlTemplateData, pdfWriter))
                {
                }
            }
            workStream.Position = 0;
            return workStream;
        }

    }
}
