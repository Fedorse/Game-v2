import { UIComponent } from '../components/UIComponent.js';

export class ExperienceBar extends UIComponent {
  constructor(game, player) {
    super(game);
    this.player = player;
    this.segments = 10; // Количество сегментов
    this.segmentGap = 4; // Расстояние между сегментами
    this.height = 12;
  }

  render(context) {
    if (!this.visible) return;

    const currentExperience = this.player.stats.experience;
    const nextLevelExp = this.player.stats.nextLevelExperience;
    const barWidth = this.game.canvas.width - 20; // Полная ширина бара
    const segmentWidth =
      (barWidth - (this.segments - 1) * this.segmentGap) / this.segments;

    const x = 10;
    const y = 2;

    const experiencePercentage = currentExperience / nextLevelExp;
    const filledSegments = Math.floor(experiencePercentage * this.segments);
    const lastSegmentPercentage = (experiencePercentage * this.segments) % 1;

    // Отрисовка каждого сегмента
    for (let i = 0; i < this.segments; i++) {
      const segmentX = x + i * (segmentWidth + this.segmentGap);

      // Фон сегмента
      context.fillStyle = 'rgba(0, 0, 0, 0.3)';
      context.fillRect(segmentX, y, segmentWidth, this.height);

      // Заполненная часть
      if (i < filledSegments) {
        // Полностью заполненный сегмент
        context.fillStyle = 'rgb(59, 130, 246)';
        context.fillRect(segmentX, y, segmentWidth, this.height);
      } else if (i === filledSegments && lastSegmentPercentage > 0) {
        // Частично заполненный сегмент
        context.fillStyle = 'rgb(59, 130, 246)';
        context.fillRect(
          segmentX,
          y,
          segmentWidth * lastSegmentPercentage,
          this.height
        );
      }

      // Обводка сегмента
      context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      context.lineWidth = 1;
      context.strokeRect(segmentX, y, segmentWidth, this.height);
    }
  }
}
