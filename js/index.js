var app = new Vue({
    el: '#app',
    data: {
        newTodo: '', // todo 新增項目

        todos: [ // todo list 
            {
                id: '0',
                title: '請輸入代辦事項',
                completed: false // 是否完成 
            }
        ],

        visibility: 'all',

        cacheTodo: [],
        cacheTitle: ''
    },
    methods: {
        // todo 按下「新增」按鈕呼叫的函示 
        addTodo: function () {

            var value = this.newTodo.trim();// ! trim() 會刪除字串前後的空白 
            // ? 用現在時間轉成 id 
            var timeStamp = Math.floor(Date.now());

            if (!value) {
                return;// 空白不會加入到 todo list
            }

            // ? 紀錄 log 
            console.log(value, timeStamp);

            // ? 存入代辦事項的 todo list 
            this.todos.push({
                id: timeStamp,
                title: value,
                completed: false
            });

            // ? 清除輸入的新項目 
            this.newTodo = '';

        },

        // todo 刪除一個項目
        removeTodo: function (todo) {

            // ? 找到要刪除的項目索引
            var newIndex = this.todos.findIndex( function(item, key) {
                return todo.id == item.id;
            });
            this.todos.splice(newIndex, 1);// 1 是指刪除 1 筆資料
        },

        // todo 編輯選取的項目
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },

        // todo 取消修改項目
        cancelEdit: function () {
            this.cacheTodo = {};
        },

        // todo 確定修改項目
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        }
    },
    computed: {
        // todo 依據分頁過濾項目
        filteredTodo: function () {
            if (this.visibility == "all") {
                return this.todos;
            }
            else if (this.visibility == "active") {
                var newTodo = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        newTodo.push(item);
                    }
                });
                return newTodo;
            }
            else if (this.visibility == "completed") {
                var newTodo = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newTodo.push(item);
                    }
                });
                return newTodo;
            }
            return [];
        }
    }
});