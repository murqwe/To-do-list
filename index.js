import Counter from './Counter.js';
let a = 0;
a = 'asd';

function printHello(name) {
	console.log(name);
}
printHello('Tom');

$(function () {
	// let addTask = document.getElementById('addTask');
	// console.log(addTask);
	// addTask.onclick = function () {
	// 	alert('Нажали на кнопку');
	// };
	// let remuve = $('#remuve');
	// remuve.click(function () {
	// 	alert('Нажали на кнопку');
	// });

	let taskCounter = new Counter('#taskCount'); //кол-во всех задач
	let taskSuccessCounter = new Counter('#taskSuccessCount'); //кол-во успешных задач
	let taskActiveCounter = new Counter('#taskActiveCount'); //кол-во активных задач
	let tasks = [];

	//программируем событие нажатия по элементу html страницы с id = addTask
	$('#addTask').click(function () {
		let taskName = $('#taskName').val();
		if (taskName == '') {
			$('#validationAddTask').text('Введите название задачи!');
			$('#taskName').addClass('is-invalid');
			return;
		} else {
			$('#taskName').removeClass('is-invalid');
		}

		let task = tasks.find((x) => x == taskName);

		if (task != undefined) {
			$('#validationAddTask').text('Такая задача уже добавлена');
			$('#taskName').addClass('is-invalid');
			return;
		} else {
			$('#taskName').removeClass('is-invalid');
		}

		new Noty({
			type: 'success',
			layout: 'topRight',
			text: '<i class="fa-solid fa-check"></i>  Задача успешно добавлена!',
			theme: 'light',
			timeout: 1000,
			animation: {
				open: 'animate__animated animate__bounceInRight', // Animate.css class names
				close: 'animate__animated animate__bounceOutRight', // Animate.css class names
			},
		}).show();

		$('#activeTasks').append(`
            <label class="list-group-item justify-content-between d-flex align-items-center">
                <div class="">
                    <input class="form-check-input me-1" type="checkbox" value="" />
                    <span class="taskName">${taskName}<span>
                </div>
                <button type="button" class="btn btn-outline-danger btn-remove " data-bs-toggle="tooltip" data-bs-placement="top" title="Удалить">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </label>
        `);

		$('[data-bs-toggle="tooltip"]').tooltip({
			trigger: 'hover focus',
		});

		tasks.push(taskName);

		taskCounter.increment();
		taskActiveCounter.increment();
	});

	$(document).on('click', '.btn-remove', function () {
		$(this).parent().remove();
		let taskName = $(this).parent().find('.taskName').text();
		let taskIndex = tasks.findIndex((x) => x == taskName);
		tasks.splice(taskIndex, 1);

		taskCount--;
		$('#taskCount').text(taskCount);

		if ($(this).parent().find('.form-check-input').is(':checked')) {
			taskSuccessCount--;
			$('#taskSuccessCount').text(taskSuccessCount);
		} else {
			taskActiveCount--;
			$('#taskActiveCount').text(taskActiveCount);
		}
	});

	$(document).on('click', '.form-check-input', function () {
		let isChecked = $(this).is(':checked');
		if (isChecked) {
			taskSuccessCount++;
			$('#taskSuccessCount').text(taskSuccessCount);

			taskActiveCount--;
			$('#taskActiveCount').text(taskActiveCount);

			let task = $(this).parent().parent();
			$('#successTasks').append(task);
		} else {
			taskSuccessCount--;
			$('#taskSuccessCount').text(taskSuccessCount);

			taskActiveCount++;
			$('#taskActiveCount').text(taskActiveCount);

			let task = $(this).parent().parent();
			$('#activeTasks').append(task);
		}
	});
});
