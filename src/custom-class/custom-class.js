/**
 * This code creates a block with a title and description.
 * There is a datepicker and font-family dropdown in the block inspector.
 * There is also a custom button in the tool bar to 'edit, and allow changes,
 * or 'preview' and block changes.
 *
 * The code makes use of a custom class component which extends Component,
 * just like 'normal' React. This removes all of the layout code from
 * the registerBlockType() `edit` function.
 *
 * Adapted from here:
 * https://awhitepixel.com/blog/wordpress-gutenberg-create-custom-blocks-part-7-create-custom-components/
 */

/**
 * If installing @wordpress packages and using `import`
 * put the `import` statements here at the top before the
 * `export default` statement below
 */

import classnames from "classnames";

const { registerBlockType } = wp.blocks;
const { Component } = wp.element;
const { date: wpDate } = wp.date;
const { __ } = wp.i18n;
const {
  RichText,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  useBlockProps,
} = wp.blockEditor;
const {
  Toolbar,
  ToolbarGroup,
  Button,
  DateTimePicker,
  Panel,
  PanelBody,
  PanelRow,
  SelectControl,
  Placeholder,
  Disabled,
} = wp.components;

// Use @wordpress.data to format attributes.date date
const DateString = ({ date }) => wpDate("l j F, Y", date);

// The custom class component. Just like a React component.
class MyPrefixCustomComponent extends Component {
  constructor(props) {
    super(props);
    // The sate is used to toggle the edit/preview button. This is not saved.
    this.state = {
      editMode: true,
    };
  }
  /* The block control toolbar with alignment buttons and a custom button.
      The label and icon of the custom button toggle on state.editMode. */
  getBlockControls() {
    const { attributes, setAttributes } = this.props;

    return (
      <BlockControls>
        <AlignmentToolbar
          value={attributes.textAlignment}
          onChange={(newAlign) => setAttributes({ textAlignment: newAlign })}
        />
        <Toolbar label="Buttons">
          <ToolbarGroup>
            <Button
              label={
                this.state.editMode
                  ? __("Preview", "textDomain")
                  : __("Edit", "textDomain")
              }
              icon={this.state.editMode ? "welcome-view-site" : "edit"}
              onClick={() => this.setState({ editMode: !this.state.editMode })}
            />
          </ToolbarGroup>
        </Toolbar>
      </BlockControls>
    );
  }
  /* The block inspector with a date picker and font-family dropdown.
      The date picker returns the date in the form yyyy-mm-ddThh:mm:ss */
  getInspectorControls() {
    const { attributes, setAttributes } = this.props;
    return (
      <InspectorControls>
        <Panel>
          <PanelBody title="Date controls" initialOpen={false}>
            <PanelRow>
              <DateTimePicker
                currentDate={attributes.date}
                onChange={(newDate) => setAttributes({ date: newDate })}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="FontFamily" initialOpen={false}>
            <PanelRow>
              <SelectControl
                label="Font family?"
                value={attributes.font}
                options={[
                  { label: "Sans-serif", value: "sans-serif" },
                  { label: "Serif", value: "serif" },
                  { label: "Mono spaced", value: "monospace" },
                ]}
                onChange={(newVal) => setAttributes({ font: newVal })}
              />
            </PanelRow>
          </PanelBody>
        </Panel>
      </InspectorControls>
    );
  }
  // The RIchText part fo the content, including the date from the picker.
  getContent() {
    const { attributes, setAttributes } = this.props;
    const { content, textAlign } = attributes;

    const blockProps = useBlockProps({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
      }),
      style: { fontFamily: attributes.font || "inherit" },
    });

    return (
      <div {...blockProps}>
        <RichText
          tagName="h2"
          placeholder={__("Your heading here...", "textDomain")}
          value={attributes.myRichHeading}
          onChange={(newText) => setAttributes({ myRichHeading: newText })}
        />
        <RichText
          tagName="p"
          placeholder={__("Your description here...", "textDomain")}
          value={attributes.myRichText}
          onChange={(newText) => setAttributes({ myRichText: newText })}
        />
        {attributes.date && (
          <div className="my-date">
            <DateString date={attributes.date} />
          </div>
        )}
      </div>
    );
  }
  render() {
    /* React can accept an array as the returned value. 
        The contents of the array depends on the value of state.editMode. 
        @wordpress/components PlaceHolder puts the content in a formatted block.
        @wordpress/components Disabled prevents editing. */
    const content = this.state.editMode
      ? [
          this.getInspectorControls(),
          this.getBlockControls(),
          this.getContent(),
        ]
      : [
          this.getBlockControls(),
          <Placeholder isColumnLayout={true}>
            <Disabled>{this.getContent()}</Disabled>
          </Placeholder>,
        ];

    return content;
  }
}

// RegisterBlockType as usual.

registerBlockType("myprefix/custom-component", {
  apiVersion: 2,
  title: __("Custom Class", "textDomain"),
  category: "widgets",
  icon: "lightbulb",
  description: __("A block rendered using a custom component.", "textDomain"),
  keywords: [__("example", "textDomain"), __("test", "textDomain")],
  attributes: {
    myRichHeading: {
      type: "string",
      source: "html",
      selector: "h2",
    },
    myRichText: {
      type: "string",
      source: "html",
      selector: "p",
    },
    textAlignment: {
      type: "string",
    },
    date: {
      type: "string",
      default: new Date().toISOString(),
    },
    font: {
      type: "string", // SelectControl - dropdown
      default: "sans-serif",
    },
  },
  supports: {
    align: true,
  },
  edit: MyPrefixCustomComponent,
  save: (props) => {
    const { attributes } = props;

    const { content, textAlign } = attributes;

    const blockProps = useBlockProps.save({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
      }),
      style: { fontFamily: attributes.font || "inherit" },
    });

    return (
      <div {...blockProps}>
        <RichText.Content tagName="h2" value={attributes.myRichHeading} />
        <RichText.Content tagName="p" value={attributes.myRichText} />
        {attributes.date && (
          <div className="my-date">
            <DateString date={attributes.date} />
          </div>
        )}
      </div>
    );
  },
});
