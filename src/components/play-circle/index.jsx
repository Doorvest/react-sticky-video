import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import appStyles from '../../app.scss';
import styles from './play-circle.scss';

const PlayCircle = ({ isReady, controlsColor }) => (
  <>
    <div
      className={classNames(
        styles.bg,
        { [appStyles.hide]: !isReady },
      )}
    />
    <div
      className={styles.container}
    >
      <FontAwesomeIcon
        style={{ color: controlsColor }}
        icon={isReady ? faPlayCircle : faCircleNotch}
        spin={!isReady}
      />
    </div>
  </>
);

PlayCircle.propTypes = {
  isReady: PropTypes.bool,
  controlsColor: PropTypes.string,
};

PlayCircle.defaultProps = {
  isReady: false,
};

export default PlayCircle;
