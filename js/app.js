class AnimatedCard {
    constructor(config) {
        this.cards = document.querySelectorAll(config.cards);
        this.addListeners();
    }

    addListeners() {
        this.cards.forEach((card) => {
            card.addEventListener('mouseenter', (e) => {
                this.runAnimation(e.target, e);
            });

            card.addEventListener('mouseleave', (e) => {
                this.runAnimation(e.target, e);
            });
        });
    }

    runAnimation(element, event) {
        let isCard = element.classList.contains('card');
        if (isCard) {
            let cardLayer = element.querySelector('.card__layer');
            let side = this.findSide(element, event.x, event.y);
            let className = '';
            switch (side) {
                case 'top':
                    className = this.getPrefix(event.type) + '-top';
                    break;
                case 'bottom':
                    className = this.getPrefix(event.type) + '-bottom';
                    break;
                case 'left':
                    className = this.getPrefix(event.type) + '-left';
                    break;
                case 'right':
                    className = this.getPrefix(event.type) + '-right';
                    break;
            }
            cardLayer.classList.remove('enter-top', 'enter-bottom', 'enter-left', 'enter-right', 'leave-top', 'leave-bottom', 'leave-left', 'leave-right');
            cardLayer.classList.add(className);
        }
    }

    getPrefix(eventType) {
        return eventType === 'mouseleave' ? 'leave' : 'enter';
    }

    findSide(card, mouseX, mouseY) {
        let cardBounding = card.getBoundingClientRect();

        let elLeftEdge = cardBounding.left;
        let elTopEdge = cardBounding.top;
        let elRightEdge = cardBounding.right;
        let elBottomEdge = cardBounding.bottom;

        let diffTopEdgeAndMouseY = Math.abs(elTopEdge - mouseY);
        let diffBottomEdgeAndMouseY = Math.abs(elBottomEdge - mouseY);
        let diffLeftEdgeAndMouseX = Math.abs(elLeftEdge - mouseX);
        let diffRightEdgeAndMouseX = Math.abs(elRightEdge - mouseX);

        let min = Math.min(diffTopEdgeAndMouseY, diffBottomEdgeAndMouseY, diffLeftEdgeAndMouseX, diffRightEdgeAndMouseX);

        switch (min) {
            case diffTopEdgeAndMouseY:
                return 'top';
            case diffBottomEdgeAndMouseY:
                return 'bottom';
            case diffLeftEdgeAndMouseX:
                return 'left';
            case diffRightEdgeAndMouseX:
                return 'right';
        }
    }
}

new AnimatedCard({
    cards: '.card'
});
