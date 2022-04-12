import React from 'react';

interface PreviewProps {
  value: string;
}

class PreviewModal extends React.Component<PreviewProps, {}> {
  constructor(props: PreviewProps) {
    super(props);
  }

  render() {
    return (
      <>
        <input
          type="checkbox"
          name="preview-modal"
          id="preview-modal"
          className="modal-toggle"
        />
        <div className="modal cursor-pointer modal-bottom sm:modal-middle">
          <div className="modal-box">
            <article
              className="prose"
              id="preview-modal"
            >
              {this.props.value}
            </article>
            <div className="modal-action">
              <label
                htmlFor="preview-modal"
                className="btn"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PreviewModal;
