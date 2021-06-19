import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import CucumberMarkdownProseMirror from '../CucumberMarkdownProseMirror'
import { useProseMirror } from 'use-prosemirror'
import makeConfig from '../makeConfig'
import MarkdownSimpleCodeEditor from '../MarkdownSimpleCodeEditor'
import useGherkinDocument from "../useGherkinDocument";

export default {
  title: 'MarkdownEditor',
  component: CucumberMarkdownProseMirror,
} as Meta

type TemplateArgs = { initialMarkdown: string }

const Template: Story<TemplateArgs> = ({ initialMarkdown }) => {
  const [markdown, setMarkdown] = useState(initialMarkdown)
  const {gherkinDocument, error} = useGherkinDocument(markdown)
  const [state, setState] = useProseMirror(makeConfig(markdown))

  return (
    <div>
      <CucumberMarkdownProseMirror state={state} setState={setState} setMarkdown={setMarkdown} gherkinDocument={gherkinDocument}/>
      <MarkdownSimpleCodeEditor markdown={markdown} setMarkdown={setMarkdown} setState={setState} />
    </div>
  )
}

export const EmptyDocument = Template.bind({})
EmptyDocument.args = {
  initialMarkdown: ``,
}

export const DataTables = Template.bind({})
DataTables.args = {
  initialMarkdown: `# Feature: Welcome

Let's use some tables

## Scenario: some tables

* Given the following people

  | Name  | Number |
  | ----- | ------ |
  | Jill  |      1 |
  | Bob   |     10 |
  | Sally |    100 |
`,
}