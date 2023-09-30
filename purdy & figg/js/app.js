class Slider {
	constructor(containerId) {
		this.container = document.querySelector(containerId);
		this.sliderTrack = this.container.querySelector(".slider-track");
		this.slides = this.container.querySelectorAll(".slide");
		this.prevBtn = this.container.querySelector(".prev-btn");
		this.nextBtn = this.container.querySelector(".next-btn");
		this.currentIndex = 0;

		this.prevBtn.addEventListener("click", () => {
			this.goToSlide(this.currentIndex - 1);
		});

		this.nextBtn.addEventListener("click", () => {
			this.goToSlide(this.currentIndex + 1);
		});

		window.addEventListener("resize", () => {
			this.currentIndex = 0;
			this.updateSlider();
			this.updateButtonStates();
		});

		// Initial setup
		this.updateSlider();
		this.updateButtonStates();
	}

	updateSlider() {
		const gap = isNaN(this.getGapWidth()) ? 0 : this.getGapWidth();
		const slideWidth = this.slides[0].offsetWidth;
		const translateX = -this.currentIndex * (slideWidth + gap);
		this.sliderTrack.style.transform = `translateX(${translateX}px)`;
	}

	getGapWidth() {
		const style = window.getComputedStyle(this.sliderTrack);
		const gapValue = style.getPropertyValue("gap");
		return gapValue ? parseFloat(gapValue) : 0;
	}

	goToSlide(index) {
		if (index >= 0 && index < this.slides.length) {
			this.currentIndex = index;
			this.updateSlider();
			this.updateButtonStates();
		}
	}

	updateButtonStates() {
		// Disable "Previous" button when the first slide is active
		if (this.currentIndex === 0) {
			this.prevBtn.disabled = true;
		} else {
			this.prevBtn.disabled = false;
		}

		// Disable "Next" button when the last slide is active
		if (this.currentIndex === this.slides.length - 1) {
			this.nextBtn.disabled = true;
		} else {
			this.nextBtn.disabled = false;
		}
	}
}
