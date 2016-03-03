### Table Pagination
---------------------------------------------------------
简单的表格插件，实现表格分页，数据搜索功能

```javascript
    $(table).tablePagination(
        {
            pageSize: 20,  //每页显示的数据数
            pageBtnNum: 5, //分页按钮数目
            addSearchInput: true, // 是否添加搜索框
            searchInputColumn: 1, // 搜索框所占的列数
            searchInputClass: ""  // 搜索框的CSS样式类
        }
    );
```