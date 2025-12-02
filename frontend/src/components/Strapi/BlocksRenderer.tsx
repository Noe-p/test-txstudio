import Image from 'next/image';
import React from 'react';

interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: 'link';
  url: string;
  children: (TextNode | LinkNode)[];
}

type InlineNode = TextNode | LinkNode;

export interface Block {
  type: string;
  children?: InlineNode[];
  level?: number;
  format?: 'ordered' | 'unordered';
  image?: {
    url: string;
    alternativeText?: string;
  };
  [key: string]: unknown;
}

interface BlocksRendererProps {
  content: Block[];
}

export function BlocksRenderer({ content }: BlocksRendererProps): React.JSX.Element {
  if (!content || !Array.isArray(content)) {
    return <></>;
  }

  const renderInlineNode = (node: InlineNode, index: number): React.ReactNode => {
    if (node.type === 'text') {
      let text: React.ReactNode = node.text;

      if (node.bold) text = <strong key={index}>{text}</strong>;
      if (node.italic) text = <em key={index}>{text}</em>;
      if (node.underline) text = <u key={index}>{text}</u>;
      if (node.strikethrough) text = <s key={index}>{text}</s>;
      if (node.code) text = <code key={index}>{text}</code>;

      return text;
    }

    if (node.type === 'link') {
      return (
        <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">
          {node.children?.map((child, i) => renderInlineNode(child, i))}
        </a>
      );
    }

    return null;
  };

  const renderBlock = (block: Block, index: number): React.ReactNode => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4">
            {block.children?.map((child, i) => renderInlineNode(child, i))}
          </p>
        );

      case 'heading': {
        const HeadingTag = `h${block.level || 1}` as keyof React.JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="font-bold mb-2">
            {block.children?.map((child, i) => renderInlineNode(child, i))}
          </HeadingTag>
        );
      }

      case 'list': {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = (block.children || []) as unknown as Block[];
        return (
          <ListTag key={index} className="mb-4 ml-6 list-disc [&>li]:mb-0">
            {items.map((item, i) => (
              <li key={i}>{item.children?.map((child, j) => renderInlineNode(child, j))}</li>
            ))}
          </ListTag>
        );
      }

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 pl-4 italic mb-4">
            {block.children?.map((child, i) => renderInlineNode(child, i))}
          </blockquote>
        );

      case 'code':
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            <code>{block.children?.map((child, i) => renderInlineNode(child, i))}</code>
          </pre>
        );

      case 'image': {
        if (!block.image?.url) return null;
        return (
          <div key={index} className="mb-4 relative w-full h-auto">
            <Image
              src={block.image.url}
              alt={block.image.alternativeText || ''}
              width={800}
              height={600}
              className="max-w-full h-auto"
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="blocks-content">{content.map((block, index) => renderBlock(block, index))}</div>
  );
}
