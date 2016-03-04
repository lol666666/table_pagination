//jQuery 表格分页插件
//require: jQuery1.11 + , Bootstrap

(function($){
    $.fn.tablePagination = function(options){

         var defaults = $.extend({}, $.fn.tablePagination.defaults, options);
         var table = $(this);
         var pages = Math.ceil($(table).find("tbody tr").length / defaults.pageSize);
         $(table).find("tbody tr").addClass("hidden").slice(0, defaults.pageSize).each(function(i){
            $(this).removeClass("hidden");
         });
         var tableColumnNum = $(table).find("tbody tr:first td").length;
         if ($(table).find("tfoot").length == 0) 
         {
                $(table).append("<tfoot></tfoot>");
         }
         //添加分页
         var pagination_begin = "<ul class='" + defaults.paginationUlClass + "' style='display:block'><li><a href='#' aria-label='Previous'><span aria-hidden='true'>&laquo;</span></a></li>";
         var pagination_end = "<li><a href='#' aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li> </ul>";
         var pagination_end = "<li><a href='#' aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li> </ul>";
         var page_input = "<input class='form-control page-input " + defaults.pageInputClass + "' style='width:40px;display:inline-block;margin-left:10px'/>";
         var pagination_btn = "";
         for(var i  = 0; i < (pages > defaults.pageBtnNum ? pages - 1 : pages); i ++)
         {
             if(i >= defaults.pageBtnNum)
             {
                 pagination_btn += ("<li class='hidden'><a href='#' data-page = '"+ (i + 1) + "'>" + (i + 1) +  "</a></li>");
             } else {
                 pagination_btn += ("<li ><a href='#' data-page = '"+ (i + 1) + "'>" + (i + 1) +  "</a></li>");
             }
         }
         if (pages > defaults.pageBtnNum ) {pagination_btn += ("<li class='disabled'><a href='#'>...</a></li>" + ("<li ><a href='#' data-page = '"+ pages + "'>" + pages +  "</a></li>"));}        
         
         var pageSizeChoose_begin = '<div class="' + defaults.pageSizeChooseBtnClass + '" style="display:inline-block; margin-left:10px"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Size <span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="dropdownMenu2">';
         var pageSizeChoose = "";
         for(var i = 0; i < defaults.pageSizeChoose.length; i ++)
         {
            pageSizeChoose += ("<li><a>" + defaults.pageSizeChoose[i] + "</a></li>");
         }
         var pageSizeChoose_end = '</ul></div>';

         $(table).find("tfoot").append("<tr class='table-pagination'><td colspan='" + tableColumnNum + "'>" + pagination_begin + pagination_btn + pagination_end + page_input  + pageSizeChoose_begin + pageSizeChoose + pageSizeChoose_end+ "</td></tr>")
             .find("ul.pagination li").not(":first,:last,.disabled").find("a").click(function(){
                 $(this).parents("ul").find("li").removeClass("active").end().end().parent("li").addClass("active");
                 $(this).parents("table").find("tbody tr").addClass("hidden").slice((parseInt($(this).data("page")) - 1) * defaults.pageSize, parseInt($(this).data("page")) * defaults.pageSize)
                        .each(function(index){
                            $(this).removeClass("hidden");
                        });
             }).end().filter(":first").addClass("active")
               .end().end().filter(":first,:last").find("a").click(function(){
                     var parents_ul = $(this).parents("ul");
                     var current_page = parseInt($(parents_ul).find("li.active a").data("page"));
                     if ( $(this).attr("aria-label") == "Previous" && current_page > 1)
                     {
                         $(parents_ul).find("a[data-page='" + (current_page - 1) + "']").trigger("click");
                         $(parents_ul).find("a[data-page='" + current_page + "']").parent("li").prev("li").removeClass("hidden");
                         if (current_page - 1 + defaults.pageBtnNum < pages)
                         {
                             $(parents_ul).find("a[data-page='" + (current_page - 1 + defaults.pageBtnNum) + "']").parent("li").addClass("hidden");
                         }
                     }
                     if ( $(this).attr("aria-label") == "Next" && current_page < pages)
                     {
                         $(parents_ul).find("a[data-page='" + (current_page + 1) + "']").trigger("click");
                         $(parents_ul).find("a[data-page='" + current_page + "']").parent("li").next("li").removeClass("hidden");
                         $(parents_ul).find("a[data-page='" + (current_page + 1 - defaults.pageBtnNum) + "']").parent("li").addClass("hidden");
                     }
               })
               .end().end().end().find("tr:first input.page-input").change(function(){
                    var page_input = parseInt($(this).val());
                    if (page_input > 0 && page_input <= pages) 
                    {
                        var start = page_input;
                        if (page_input + defaults.pageBtnNum - 1 > pages)
                        {
                            if (pages - defaults.pageBtnNum >= 1)
                            {
                                start = pages - defaults.pageBtnNum;
                            }
                        }
                        var end = page_input + defaults.pageBtnNum - 1 <= pages ? page_input + defaults.pageBtnNum - 1 : pages;
                        $(this).parent("td").find("ul").find("a[data-page='" + page_input + "']").trigger("click")
                               .end().find("li").each(function(index){
                                var data_page = parseInt($(this).find("a").data("page"));
                                    if ((data_page < start || data_page > end) && data_page != pages)
                                    {
                                        $(this).toggleClass("hidden", true);
                                    } else {
                                        $(this).toggleClass("hidden", false);
                                    }
                               });
                    }
               }).end().find("div.dropup ul li a").click(function(){

                    $(this).parents("table").find("tfoot tr.table-pagination").remove().end().find("thead tr.search-input").remove().end().tablePagination($.extend({}, defaults, {pageSize: parseInt($(this).text())}));
               });
               //添加搜索框
               if (defaults.addSearchInput)
               {
                    if ($(table).find("thead").length == 0)
                    {
                        $(table).prepend("<thead></thead>");
                    }
                    var searchInput = "<input type='text' class='form-control " + defaults.searchInputClass + "'  />";
                    $(table).find("thead").append("<tr class='search-input'><td colspan='" + defaults.searchInputColumn + "'>" +  searchInput + "</td></tr>")
                            .find("tr.search-input td:first input").change(function(){
                                var current_page = parseInt($(table).find("tfoot tr.table-pagination ul li.active a").text());
                                var search_content = $(this).val();
                                if (search_content.length == 0)
                                {
                                    $(table).find("tfoot tr.table-pagination input.page-input").val(current_page).trigger("change");
                                } else {
                                    $(table).find("tbody tr").each(function(index){
                                        $(this).find("td").each(function(i){
                                            if($(this).text().toLowerCase().indexOf(search_content.toLowerCase()) != -1)
                                            {
                                                $(this).parent("tr").removeClass("hidden");
                                                return false;
                                            } else {
                                                $(this).parent("tr").addClass("hidden");
                                            }
                                        });
                                    });
                                }
                            });
               }
    };
    //插件默认设置
    $.fn.tablePagination.defaults = {
        pageSize: 20,
        pageBtnNum: 5,
        addSearchInput: true,
        searchInputColumn: 1,
        searchInputClass: "",
        pageSizeChoose:[10,20,30,40,50,100],
        paginationUlClass: "pagination",
        pageSizeChooseBtnClass: "dropup",
        pageInputClass: ""
    };
})(jQuery);