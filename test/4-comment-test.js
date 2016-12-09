/* eslint-env node, mocha */
/* global before, after, describe, it */

var assert = require('assert');
var wpPot = require('../');
var testHelper = require('./test-helper');

describe('Comment tests', function () {
  it('Can read different type of comments', function () {
    var fixturePath = 'test/fixtures/comments.php';

    var potContents = wpPot({
      src: fixturePath,
      writeFile: false
    });

    assert(testHelper.verifyLanguageBlock(potContents, 'translators: This is a test', fixturePath + ':3', 'Single line comment', false, false));
    assert(testHelper.verifyLanguageBlock(potContents, 'translators: This is also a test', fixturePath + ':8', 'Multiline comment, one line', false, false));
    assert(testHelper.verifyLanguageBlock(potContents, 'translators: This is test number three', fixturePath + ':15', 'Multiline comment, multi line', false, false));
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':19', 'Comment too far away from function', false, false));
  });

  it('Can read comments with other trigger', function () {
    var fixturePath = 'test/fixtures/comments.php';

    var potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      commentKeyword: 'Other keyword: '
    });

    assert(testHelper.verifyLanguageBlock(potContents, 'Other keyword: This is a comment to the translator', fixturePath + ':22', 'Comment with other keyword', false, false));
  });
});
