import React, {
  forwardRef,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faClosedCaptioning,
} from '@fortawesome/free-solid-svg-icons';
import t from '../../constants/actionTypes';
import Store from '../../store';
import PlayCircle from '../play-circle';
import ProgressBar from '../progress-bar';
import IconButton from '../icon-button';
import VolumeSlider from '../volume-slider';
import appStyles from '../../styles.scss';
import styles from './styles.scss';
import Timer from '../timer';

const Controls = forwardRef((
  {
    show,
    isFullScreen,
    isMobile,
    captions,
    onClickFullscreen,
    onCancelFullscreen,
    cancelHideControls,
  },
  refCCButton,
) => {
  const {
    state: {
      playerStatus: {
        hasPlayed,
        isPlaying,
        currentTime,
        duration,
      },
      playerControls: {
        play,
        pause,
        seekTo,
      },
    },
    dispatch,
  } = useContext(Store);

  const containerStyle = {
    [appStyles.hide]: !hasPlayed || !show,
  };

  const handleMouseMove = useCallback((event) => {
    cancelHideControls();
    event.stopPropagation();
  }, [cancelHideControls]);

  const handleShowCC = useCallback(() => {
    dispatch({
      type: t.SHOW_CC_SETTING,
    });
  }, [dispatch]);

  return (
    <>
      {!hasPlayed && <PlayCircle />}
      <div
        className={classNames(
          styles.gradientBottom,
          containerStyle,
        )}
      />
      <div
        className={classNames(
          styles.container,
          containerStyle,
        )}
        onMouseMove={handleMouseMove}
      >
        <ProgressBar
          seekTo={seekTo}
        />
        <div className={styles.buttons}>
          <IconButton
            icon={faPlay}
            hide={isPlaying}
            onClick={play}
            disabled={!play}
          />
          <IconButton
            icon={faPause}
            hide={!isPlaying}
            onClick={pause}
            disabled={!pause}
          />
          <VolumeSlider show={!isMobile} />
          <Timer
            currentTime={currentTime}
            duration={duration}
          />
          <div className={styles.flex1} />
          {captions.length > 0 && (
            <div ref={refCCButton}>
              <IconButton
                icon={faClosedCaptioning}
                onClick={handleShowCC}
              />
            </div>
          )}
          <IconButton
            icon={faExpand}
            hide={isFullScreen}
            onClick={onClickFullscreen}
          />
          <IconButton
            icon={faCompress}
            hide={!isFullScreen}
            onClick={onCancelFullscreen}
          />
        </div>
      </div>
    </>
  );
});

Controls.propTypes = {
  show: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isMobile: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  captions: PropTypes.array.isRequired,
  onClickFullscreen: PropTypes.func.isRequired,
  onCancelFullscreen: PropTypes.func.isRequired,
  cancelHideControls: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  show: false,
  isFullScreen: false,
  isMobile: false,
};

export default Controls;
