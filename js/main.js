let menu = document.querySelector('.header__nav');
let burger = document.querySelector('.burger');
let menuLink = document.querySelectorAll('.nav__link');

const toggleMenu = () => {
	if (window.innerWidth < 1280) {
		menu.classList.toggle('header__nav--active');
		burger.classList.toggle('is-active');
	}
}

burger.addEventListener('click', e => {
	e.stopPropagation();
	toggleMenu();
});

document.addEventListener('click', e => {
	let target = e.target;
	let its_menu = target == menu || menu.contains(target);
	let its_burger = target == burger;
	let menu_is_active = menu.classList.contains('header__nav--active');

	if (!its_menu && !its_burger && menu_is_active) {
		toggleMenu();
	}
})

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		const blockID = anchor.getAttribute('href').substr(1)
		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});

		toggleMenu();
	});
};

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.step__tab-btn').forEach(function (tabBtn) {
		tabBtn.addEventListener('click', function (event) {
			const path = event.currentTarget.dataset.path

			document.querySelectorAll('.step__tab-btn').forEach(function (btnActive) {
				btnActive.classList.remove('step__tab-btn--active');
			})

			document.querySelectorAll('.step__content').forEach(function (tabContent) {
				tabContent.classList.remove('step__content--active');
			})

			document.querySelector(`[data-target="${path}"]`).classList.add('step__content--active')
			tabBtn.classList.add('step__tab-btn--active');
		})
	})
});

var mySwiper = new Swiper('.hero__swiper-container', {
	slideClass: 'hero__slide',
	slidesPerView: 1,
	effect: 'fade',
	keyboard: {
		enabled: true,
		onlyInViewport: false,
	},
	pagination: {
		el: '.hero__swiper-pagination',
		clickable: true,
	},
	autoplay: {
		delay: 3200,
		disableOnInteraction: false,
	}
});


$(function () {
	var icons = {
		header: "ui-icon-circle-arrow-e",
		activeHeader: "ui-icon-circle-arrow-s"
	};

	$("#accordion").accordion({
		icons: icons,
		active: true,
		collapsible: true,
		heightStyle: 'content'
	});
});

let swiperProject;
const projectSlider = document.querySelector('.project__slider-container')

function initSwiperProject() {
	swiperProject = new Swiper(projectSlider, {
		slideClass: 'project-card',
		direction: 'horizontal',
		centeredSlides: true,
		grabCursor: true,
		initialSlide: 0,
		watchSlidesVisibility: true,
		slideToClickedSlide: true,
		scrollbar: {
			el: '.project__swiper-scrollbar',
		},
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 50,
			},
			768: {
				slidesPerView: 2,
				direction: 'vertical',
				spaceBetween: 20,
				initialSlide: 0,
			},
			320: {
				slidesPerView: 2,
				spaceBetween: 50,
				direction: 'horizontal',
				initialSlide: 2,
			},
		},
		on: {
			slideNextTransitionStart: function () {
				this.$el.addClass('swiper-active').removeClass('swiper-default');
			},
			reachBeginning: function () {
				this.$el.addClass('swiper-default').removeClass('swiper-active');
			},
			reachEnd: function () {
				this.$el.addClass('swiper-end');
			},
			slidePrevTransitionStart: function () {
				this.$el.removeClass('swiper-end');
			},
		}
	});
};

initSwiperProject();

$(window).on('resize', function () {
	initSwiperProject();
});

const btns = document.querySelectorAll('.btn-modal');
const modalOverlay = document.querySelector('.modal__overlay');
const modal = document.querySelectorAll('.modal');
const body = document.body;
const fixBlocks = document.querySelectorAll('.fix-block');

let disableScroll = function () {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	let pagePosition = window.scrollY;
  fixBlocks.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	});
	body.style.paddingRight = paddingOffset;
	body.classList.add('disable-scroll');
	body.dataset.position = pagePosition;
	body.style.top = -pagePosition + 'px';
}

let enableScroll = function () {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	body.style.top = 'auto';
	body.classList.remove('disable-scroll');
  fixBlocks.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	body.style.paddingRight = '0px';
	window.scroll({top: pagePosition, left: 0});
	body.removeAttribute('data-position');
}
