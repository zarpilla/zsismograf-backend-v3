import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { LoadingBar } from 'strapi-helper-plugin';

const ProjectLink = ({ error, isFirst, isLoading, name, id }) => {
    console.log('isLoading', isLoading)
  if (isLoading) {
    return (
      <>
        <LoadingBar style={{ marginBottom: 13 }} />
        <LoadingBar style={{ width: '40%', marginBottom: 31 }} />
      </>
    );
  }
  console.log('error', error)
  if (error) {
    return null;
  }

  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={`https://strapi.io/blog/${id}`}
      style={{ color: '#333740' }}
    >
      <h2>{name}</h2>
    </a>
  );
};

ProjectLink.defaultProps = {
  name: null,
  isFirst: false,
  id: null,
};

ProjectLink.propTypes = {
  error: PropTypes.bool.isRequired,
  isFirst: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
};

export default memo(ProjectLink);