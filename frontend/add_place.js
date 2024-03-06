new FinisherHeader({
  "count": 100,
  "size": {
    "min": 2,
    "max": 28,
    "pulse": 0
  },
  "speed": {
    "x": {
      "min": 0,
      "max": 0.4
    },
    "y": {
      "min": 0,
      "max": 0.6
    }
  },
  "colors": {
    "background": "#02021e",
    "particles": [
      "#00dfc4"
    ]
  },
  "blending": "overlay",
  "opacity": {
    "center": 1,
    "edge": 0
  },
  "skew": 0,
  "shapes": [
    "c"
  ]
});

function updateFileName() {
  var input = document.getElementById('file-upload');
  var fileNameSpan = document.getElementById('file-name');
  var fileName = input.files[0] ? input.files[0].name : "Файл не выбран";
  fileNameSpan.textContent = fileName;
}

function deleteFile() {
  var input = document.getElementById('file-upload');
  var fileNameSpan = document.getElementById('file-name');
  // Сброс выбранного файла
  input.value = "";
  // Обновление текста, показывающего имя файла
  fileNameSpan.textContent = "Файл не выбран";
  // Скрыть кнопку удаления, если нужно
  // document.getElementById('delete-file').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.save-btn').forEach(function(button) {
      button.addEventListener('click', function(event) {
          var card = this.closest('.card');

          // Добавляем класс 'initial', указывая на начальное состояние
          card.classList.add('initial');
          card.classList.remove('some-animation-class'); // Удалите классы, которые добавляли анимацию

          // Принудительное возвращение к начальному состоянию
          // Если ваша анимация зависит от inline-стилей
          card.querySelector('.face1').style.transform = 'translateY(300px)';
          card.querySelector('.face2').style.transform = 'translateY(-100px)'; // Пример, адаптируйте под ваш случай

          // Опционально: сохранение данных из карточки
          // Здесь может быть ваш код для сохранения данных...

          event.preventDefault(); // Предотвращение стандартного поведения кнопки
      });
  });
});