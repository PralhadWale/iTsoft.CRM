using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace iTSoft.CRM.Core.Helpers
{
    public class InputDetails
    {
        public PropertyInfo InputProperty { get; internal set; }
        public dynamic Value { get; internal set; }
    }
    public abstract class MapperBase
    {

        public const char FieldSaperator = '|';
        public const char PropertySaperator = '.';

        public InputDetails GetPropertyInfo<T>(T rawData, string propertyName)
        {
            InputDetails inputDetails = new InputDetails();
            PropertyInfo propertyInfo = null;
            dynamic propertyValue = null;
            object propertyObject = null;
            string[] propertyDetails = propertyName.Split(new char[] { PropertySaperator });
            for (int i = 0; i < propertyDetails.Length; i++)
            {
                if (i == 0)
                {
                    propertyInfo = rawData.GetType().GetProperty(propertyDetails[i]);
                    propertyObject = rawData;
                }
                else
                {
                    propertyInfo = propertyObject.GetType().GetProperty(propertyDetails[i]);
                }
                if (propertyInfo == null)
                {
                    propertyValue = null;
                    break;
                }
                else if (i < propertyDetails.Length - 1)
                {
                    propertyValue = propertyInfo.GetValue(propertyObject);
                    propertyObject = propertyValue;

                }
                else if (i == propertyDetails.Length - 1)
                {
                    propertyValue = propertyInfo.GetValue(propertyObject);

                }

                if (propertyObject == null)
                {
                    propertyInfo = null;
                    propertyValue = null;
                    break;
                }
            }

            if (propertyInfo != null)
            {
                inputDetails = new InputDetails();
                inputDetails.InputProperty = propertyInfo;
                inputDetails.Value = propertyValue;
            }

            return inputDetails;
        }

        public T GetPropertyValue<T, T1>(string variableName, T1 rawData)
        {
            PropertyInfo pi = rawData.GetType().GetProperty(variableName);
            return (T)pi.GetValue(rawData);
        }

        public DataTable ToDataTable(dynamic dataSource, string fieldsToExclude)
        {
            var baseType = (Type)dataSource.GetType();
            if ((dataSource is IList && baseType.IsGenericType) || baseType.IsClass)
            {
                DataTable result = new DataTable();
                Type type = null;
                if (dataSource is IList)
                {
                    type = baseType.GenericTypeArguments[0];
                }
                else
                {
                    type = baseType;
                }

                PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(type);
                result.TableName = type.Name;

                var excludedValues = new List<string>();

                if (!string.IsNullOrEmpty(fieldsToExclude))
                {
                    excludedValues = fieldsToExclude.Split(new char[] { FieldSaperator }).OfType<string>().ToList();
                }

                Dictionary<string, PropertyDescriptor> tableProperties = new Dictionary<string, PropertyDescriptor>();
                foreach (PropertyDescriptor propertyInfo in properties)
                {
                    string propName = propertyInfo.Name;

                    if (!string.IsNullOrEmpty(propertyInfo.DisplayName))
                    {
                        propName = propertyInfo.DisplayName;
                    }


                    if (excludedValues.Contains(propName))
                        continue;

                    tableProperties.Add(propName, propertyInfo);
                    result.Columns.Add(propName);
                }

                if (dataSource is IList)
                {
                    foreach (var item in dataSource)
                    {
                        DataRow dataRow = result.NewRow();
                        foreach (var tSettings in tableProperties)
                        {
                            dataRow[tSettings.Key] = tSettings.Value.GetValue(item);
                        }
                        result.Rows.Add(dataRow);
                    }
                }
                else
                {
                    DataRow dataRow = result.NewRow();
                    foreach (var tSettings in tableProperties)
                    {
                        dataRow[tSettings.Key] = tSettings.Value.GetValue(dataSource);
                    }
                    result.Rows.Add(dataRow);
                }

                return result;
            }
            else
            {
                throw new Exception("Invalid item source");
            }


        }

    }

}

