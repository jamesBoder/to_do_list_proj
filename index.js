document.addEventListener('DOMContentLoaded', function () {

  var getAndDisplayAllTasks = function () {

    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1333',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete btn-danger" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var createTask = function () {

    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1333',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });


  var deleteTask = function (id) {

    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1333',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'))
  });

  var markComplete = function(id) {

    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1333',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var markActive = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1333',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
       markComplete($(this).data('id'));
     } else {
       markActive($(this).data('id'));
     }
   });


  getAndDisplayAllTasks();




});