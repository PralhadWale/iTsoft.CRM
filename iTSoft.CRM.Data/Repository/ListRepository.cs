using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Repository
{
    public interface IListRepository
    {
        List<ListModel> ListAll<T>(string textField, string valueField, dynamic filters);
        List<ListModel> ListAll<T>(string textField, string valueField);
        List<ListModelWithForeignKey> ListAll<T>(string textField, string valueField, string foreignKey);
    }
    public class ListRepository : BaseRepository , IListRepository
    {

        public List<ListModel> ListAll<T>(string textField, string valueField, dynamic filters)
        {

            string query = "Select " + textField + " as Text," + valueField + " as Value From " + typeof(T).Name;
            if (filters != null)
            {
                IDictionary<string, object> keyValuePairs = filters;
                int i = 0;
                foreach (KeyValuePair<string, object> filter in keyValuePairs)
                {
                    query += i == 0 ? " where " + filter.Key + "=" + filter.Value : " and " + filter.Key + "=" + filter.Value;
                    i++;
                }
            }
            query += "Order by " + textField + " asc";
            return base.GetConnection().Query<ListModel>(query).AsList();
        }

        public List<ListModel> ListAll<T>(string textField, string valueField)
        {
            return base.GetConnection().Query<ListModel>("Select " + textField + " as Text," + valueField + " as Value From " + typeof(T).Name + " Order by " + textField + " asc").AsList();
            // return new List<ListModel>();
        }

        public List<ListModelWithForeignKey> ListAll<T>(string textField, string valueField, string foreignKey)
        {
            return base.GetConnection().Query<ListModelWithForeignKey>("select " + textField + " as Text," + valueField + " as Value," + foreignKey + " as ForeignKey from " + typeof(T).Name + " Order by " + textField + " asc").AsList();
        }

       
    }
}
