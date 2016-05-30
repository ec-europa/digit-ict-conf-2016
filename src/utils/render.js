import morphdom from 'morphdom';

export default (node, content) => morphdom(node, `<div>${content}</div>`, { childrenOnly: true });
