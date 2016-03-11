<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- 可选的Bootstrap主题文件（一般不用引入） -->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

    <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <!-- <script src="table_pagination.js"></script> -->
    <script src="./dist/js/jq_table-pagination.js"></script>
    <style>
        .search_input{
            width: 100px;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <table class="table">
            <tbody>
                <?php
                    for($i = 0; $i < 300; $i ++)
                    {
                    ?>
                        <tr>
                            <td><?php  echo $i + 1; ?></td>
                            <td><?php  echo printf("%013d", $i) ?></td>
                            <td>GAMELIFE</td>
                            <td>测试</td>
                            <td>测试</td>
                        </tr>
                    <?php
                    }
                ?>
            </tbody>
        </table>
    </div>
    <script>
        // table_pagination($("table"));
        $("table").tablePagination({pageSize: 20, searchInputClass: "search_input", pageSizeChoose: [10,20,30,40,50]});
    </script>
</body>
</html>