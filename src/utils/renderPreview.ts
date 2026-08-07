import { PreviewCard } from '../components/CardPreview';
import { cloneTemplate } from './utils';

export function createPreview(
    template: HTMLTemplateElement,
    onClick: () => void
): PreviewCard {
    const card = new PreviewCard(
        cloneTemplate(template)
    );

    card.onClick = onClick;

    return card;
}