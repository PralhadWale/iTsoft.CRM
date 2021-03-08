using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.HIMS.Service.Shared
{
    public interface IListService
    {
        List<ListModel> ListAll<T>(string textField, string valueField, dynamic filters);

        List<ListModel> ListAll<T>(string textField, string valueField);

        List<ListModel> ListAll<T>(string textField, string valueField , bool activeOnly );


        List<ListModel> ListAll<T>(string[] textField, string valueField);

        List<ListModel> ListEnum<T>();

        List<ListModelWithForeignKey> ListAll<T>(string textField, string valueField, string foreignKey);
        List<ListModel> GetAdvisors();

        List<ListModel> GetDepartmentAdvisors(int departmentId);
        List<ListModel> GetUserDepartments(int userId);
    }

    public class ListService : IListService
    {
        IListRepository _listRepository = null;

        public ListService(IListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        public List<ListModel> GetAdvisors()
        {
            return _listRepository.GetAdvisors();
        }

        public List<ListModel> GetDepartmentAdvisors(int departmentId)
        {
            return _listRepository.GetDepartmentAdvisors(departmentId);
        }

        public List<ListModel> GetUserDepartments(int userId)
        {
            return _listRepository.GetUserDepartments(userId);
        }

        public List<ListModel> ListAll<T>(string textField, string valueField, dynamic filters)
        {
            return _listRepository.ListAll<T>(textField, valueField, filters);
        }

        public List<ListModel> ListAll<T>(string textField, string valueField)
        {
            return _listRepository.ListAll<T>(textField, valueField);
        }

        public List<ListModel> ListAll<T>(string[] textFields, string valueField)
        {
            string textField = string.Join("+' '+", textFields);

            return _listRepository.ListAll<T>(textField, valueField);
        }

        public List<ListModelWithForeignKey> ListAll<T>(string textField, string valueField, string foreignKey)
        {
            return _listRepository.ListAll<T>(textField, valueField, foreignKey);
        }

        public List<ListModel> ListAll<T>(string textField, string valueField, bool activeOnly)
        {
            return _listRepository.ListAll<T>(textField, valueField, activeOnly);
        }

        public List<ListModel> ListEnum<T>()
        {
            var list = new List<ListModel>();
            foreach (var name in Enum.GetNames(typeof(T)))
            {
                list.Add(new ListModel() { Value = Convert.ToInt64((int)Enum.Parse(typeof(T), name)), Text = name });
            }
            return list;
        }
    }
}
