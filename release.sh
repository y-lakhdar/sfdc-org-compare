#!/usr/bin/env bash

DEV_BRANCH_NAME=develop
nextNpmVersion=$(node get-next-version.js)

read -p "Are you sure deploy the version ${nextNpmVersion} (y/n)? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]];
then
  exit 1
fi

echo
echo "Checking status of current branch"
echo

# This checks your current branch for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo 'You have unstaged changes according to `git status -s`'
    echo "Please commit, reset, or stash those changes"
    exit 1
fi


# This checks your current branch for differences
if [[ -z $(git status -uno | grep "up to date") ]]; then
    echo "Your branch is *not* up-to-date with origin/$RELEASE_BRANCH"
    echo "You should either push or reset to what is at master."
    echo "If you are unsure, you most likely want to do git --reset hard origin/$RELEASE_BRANCH"
    exit 1
fi

# This publishes the package
echo
echo "Create release branch"
echo
# git flow release start ${nextNpmVersion}
git checkout -b release/${nextNpmVersion} ${DEV_BRANCH_NAME}
npm run standard-version
# git flow release finish ${nextNpmVersion}
git checkout master
git merge --no-ff release/${nextNpmVersion} --message "Deployed by release script"
git tag -a ${nextNpmVersion} --message "version ${nextNpmVersion}"
git checkout ${DEV_BRANCH_NAME}
git merge --no-ff release/${nextNpmVersion} --message "Deployed by release script"
git branch -d release/${nextNpmVersion}
echo "Pushing to master"
git push origin master
echo "Pushing to $DEV_BRANCH_NAME"
git push origin $DEV_BRANCH_NAME
echo "Pushing tags"
git push origin --tags
