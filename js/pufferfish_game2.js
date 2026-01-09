/* 모달 열기 */
function openModal(modalSelector, popSelector) {
	const $modal = $(modalSelector);
	const $pop = $(popSelector);
	
	$pop.removeAttr('style');
	
	$modal.css('display', 'block');
	
	requestAnimationFrame(() => {
		$modal.addClass('active');
		$pop.addClass('active');
	});
}

$('.q_btn').on('click', function () {
	openModal('.modal_wrap', '.pop');
});

$('#checkbox2').on('change', function () {
	if (this.checked) {
		openModal('.modal_wrap2', '.pop2');
	}
});

/* 드래그 모달 닫기 */
const POP_SELECTOR = '.pop, .pop2, .pop3';
const TRANSITION_TIME = 300;
const CLOSE_DISTANCE = 100;

$(POP_SELECTOR).each(function () {
	let startY = 0;
	let currentY = 0;
	let isDragging = false;

	const $pop = $(this);
	const $modal = $pop.parent();

	function getClientY(e) {
		return e.type.includes('touch') ?
			e.originalEvent.touches[0].clientY :
			e.clientY;
	}

	$pop.on('touchstart mousedown', function (e) {
		isDragging = true;
		startY = getClientY(e);
		currentY = startY;

		$(document)
			.on('touchmove.drag mousemove.drag', function (e) {
				if (!isDragging) return;

				currentY = getClientY(e);
				const deltaY = currentY - startY;

				if (deltaY > 0) {
					$pop.css('transform', `translate(-50%, ${deltaY}px)`);
				}
			})
			.on('touchend.drag mouseup.drag', function () {
				if (!isDragging) return;
				isDragging = false;

				const deltaY = currentY - startY;

				if (deltaY > CLOSE_DISTANCE) {
					$modal.removeClass('active');
					$pop.removeClass('active');

					setTimeout(() => {
						$modal.css('display', 'none');
					}, TRANSITION_TIME);
				} else {
					$pop.removeAttr('style');
				}

				$(document).off('.drag');
			});
	});
});

/* 폼 파일 */
const userFile = document.getElementById('user_file');

if (userFile) {
	userFile.addEventListener('change', function () {
		const fileName = this.files[0]?.name || '';
		document.querySelector('.file_name').value = fileName;
	});
}

/* 테스트용 */
$('.fish_group li').click(function (e) {
	e.preventDefault();
	window.location.href = '../html/pufferfish_game2.html';
});

$('.next_btn').click(function (e) {
	e.preventDefault();
	window.location.href = '../html/pufferfish_game_form.html';
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