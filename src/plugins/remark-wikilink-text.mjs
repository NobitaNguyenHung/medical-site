import { visit } from 'unist-util-visit';

// [[Target]] / [[Target|alias]] -> text alias. An toàn, không crash.
// v1: render text. Nâng cấp thành link nội bộ sau khi có slug map.
export default function remarkWikilinkText() {
	return (tree) => {
		visit(tree, 'text', (node) => {
			if (node.value.includes('[[')) {
				node.value = node.value.replace(
					/\[\[([^\]]+)\]\]/g,
					(_, inner) => inner.split('|').pop().trim(),
				);
			}
		});
	};
}
