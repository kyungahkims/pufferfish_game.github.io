/* 열기 */
$('.q_btn').click(function () {
	fixShow(true, '.modal_wrap', '.pop');
});

$('#checkbox2').change(function () {
	if ($(this).is(':checked')) {
		fixShow(true, '.modal_wrap2', '.pop2');
	}
});

/* 닫기 */
$('.modal_wrap, .modal_wrap .close_btn').click(function () {
	fixShow(false, '.modal_wrap', '.pop');
});

$('.modal_wrap2, .modal_wrap2 .close_btn').click(function () {
	fixShow(false, '.modal_wrap2', '.pop2');
});

$('.modal_wrap3 .close_btn').click(function () {
	fixShow(false, '.modal_wrap3', '.pop3');
});

/* 팝업 클릭 시 닫히는 거 방지 */
$('.pop, .pop2, pop3').click(function (e) {
	e.stopPropagation();
});

/* 공용 함수 */
function fixShow(show, modalSelector, popSelector) {
	if (show) {
		$(modalSelector).css('display', 'block');
		setTimeout(function () {
			$(modalSelector).addClass('active');
			$(popSelector).addClass('active');
		}, 0);
	} else {
		$(modalSelector).removeClass('active');
		$(popSelector).removeClass('active');
		setTimeout(function () {
			$(modalSelector).css('display', 'none');
		}, 300);
	}
}

/* 폼 파일 */
const userFile = document.getElementById('user_file');

if (userFile) {
	userFile.addEventListener('change', function () {
		const fileName = this.files[0]?.name || '';
		document.querySelector('.file_name').value = fileName;
	});
}

/* 테스트 */
$('.fish_group li').click(function (e) {
	e.preventDefault();
	window.location.href = '../html/pufferfish_game2.html';
});

/* 복어 클릭 */
const fishImg = document.querySelector('.fish_click img');
const fishBtn = document.querySelector('.fish_click');
const tools = document.querySelectorAll('.tool');

const fishImages = [
	'../img/step-01-2@3x.png',
	'../img/step-02-2@3x.png',
	'../img/step-03-2@3x.png',
	'../img/step-04-2@3x.png',
	'../img/step-05-2@3x.png',
	'../img/step-06-2@3x.png',
	'../img/step-07-2@3x.png',
	'../img/step-08-2@3x.png',
	'../img/step-09-2@3x.png',
	'../img/step-10-2@3x.png',
	'../img/step-11-2@3x.png'
];

let step = 0;
let isFinalReached = false;
let isTransitioning = false;

fishBtn.addEventListener('click', () => {
	/*  마지막 복어 클릭 시 */
	if (isFinalReached && !isTransitioning) {
		isTransitioning = true;

		// tool 제거
		tools.forEach(tool => {
			tool.classList.add('hide');
		});

		// 복어 확대
		void fishImg.offsetWidth;
		fishImg.classList.add('zoom-out');
		fishBtn.style.pointerEvents = 'none';

		// 다음 화면 전환
		setTimeout(() => {
			location.href = './pufferfish_game3_2.html';
			document.body.classList.add('next-scene');
		}, 300);

		return;
	}

	/* 마지막 전 복어 클릭 시 */
	if (step < fishImages.length - 1) {
		step++;

		fishImg.src = fishImages[step];

		fishImg.classList.remove('grow', 'zoom-out');
		void fishImg.offsetWidth;
		fishImg.classList.add('grow');

		// tool 변경
		let toolIndex = Math.floor(step / 3);
		toolIndex = Math.min(toolIndex, tools.length - 1);

		tools.forEach(tool => tool.classList.remove('active'));
		tools[toolIndex].classList.add('active');

		// 마지막 이미지 도달 체크
		if (step === fishImages.length - 1) {
			isFinalReached = true;
		}
	}
});

