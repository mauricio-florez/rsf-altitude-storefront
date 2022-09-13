import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Button } from './';
import { Icon } from './../icon';

describe('Component: Button', () => {
  const defaultProps = {
    children: 'Continue',
    alternativeText: 'Go to the next step',
  };

  test('Levels', () => {
    const props = {
      ...defaultProps,
    };
    const toBeSnapshotted = (
      <>
        <Button {...props} />
        <Button {...props} level="secondary" />
        <Button {...props} level="tertiary" />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Levels Negative', () => {
    const props = {
      ...defaultProps,
      theme: 'negative',
    };
    const toBeSnapshotted = (
      <>
        <Button {...props} />
        <Button {...props} level="secondary" />
        <Button {...props} level="tertiary" />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Sizes', () => {
    const props = {
      ...defaultProps,
    };
    const toBeSnapshotted = (
      <>
        <Button {...props} level="primary" size="large" />
        <Button {...props} level="primary" size="medium" />
        <Button {...props} level="primary" size="small" />
        <Button {...props} level="secondary" size="medium" />
        <Button {...props} level="secondary" size="small" />
        <Button {...props} level="secondary" size="pill" />
        <Button {...props} level="tertiary" size="medium" />
        <Button {...props} level="tertiary" size="small" />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Sizes Negative', () => {
    const props = {
      ...defaultProps,
      theme: 'negative',
    };
    const toBeSnapshotted = (
      <>
        <Button {...props} level="primary" size="large" />
        <Button {...props} level="primary" size="medium" />
        <Button {...props} level="primary" size="small" />
        <Button {...props} level="secondary" size="medium" />
        <Button {...props} level="secondary" size="small" />
        <Button {...props} level="secondary" size="pill" />
        <Button {...props} level="tertiary" size="medium" />
        <Button {...props} level="tertiary" size="small" />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Disabled', () => {
    const props = {
      ...defaultProps,
      disabled: true,
    };
    const toBeSnapshotted = (
      <>
        <Button {...props} level="primary" size="large" />
        <Button {...props} level="primary" size="medium" />
        <Button {...props} level="primary" size="small" />
        <Button {...props} level="secondary" size="medium" />
        <Button {...props} level="secondary" size="small" />
        <Button {...props} level="secondary" size="pill" />
        <Button {...props} level="tertiary" size="medium" />
        <Button {...props} level="tertiary" size="small" />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Disabled Negative', () => {
    const props = {
      ...defaultProps,
      theme: 'negative',
      disabled: true,
    };

    const toBeSnapshotted = (
      <>
        <Button {...props} level="primary" size="large" />
        <Button {...props} level="primary" size="medium" />
        <Button {...props} level="primary" size="small" />
        <Button {...props} level="secondary" size="medium" />
        <Button {...props} level="secondary" size="small" />
        <Button {...props} level="secondary" size="pill" />
        <Button {...props} level="tertiary" size="medium" />
        <Button {...props} level="tertiary" size="small" />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('With Icon', () => {
    const icon = <Icon family="interaction" name="arrow-up" />;
    const props = {
      ...defaultProps,
    };
    const toBeSnapshotted = (
      <>
        <Button {...props} icon={icon} />
        <Button {...props} icon={icon} reverseIconPosition />
        <Button {...props} theme="negative" icon={icon} />
        <Button {...props} theme="negative" icon={icon} reverseIconPosition />
        <Button {...props} level="secondary" icon={icon} />
        <Button {...props} level="secondary" icon={icon} reverseIconPosition />
        <Button {...props} level="secondary" theme="negative" icon={icon} />
        <Button {...props} level="secondary" theme="negative" icon={icon} reverseIconPosition />
        <Button {...props} level="tertiary" icon={icon} />
        <Button {...props} level="tertiary" icon={icon} reverseIconPosition />
        <Button {...props} level="tertiary" theme="negative" icon={icon} />
        <Button {...props} level="tertiary" theme="negative" icon={icon} reverseIconPosition />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Block', () => {
    const props = {
      ...defaultProps,
    };
    const toBeSnapshotted = (
      <>
        <Button {...props} block />
        <Button {...props} level="tertiary" block />
        <Button {...props} level="secondary" block />
        <Button {...props} theme="negative" block />
        <Button {...props} level="secondary" theme="negative" block />
        <Button {...props} level="tertiary" theme="negative" block />
      </>
    );

    const tree = renderer.create(toBeSnapshotted).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
