export const GIT_COMMANDS = [
  /* ===================== SETUP & CONFIG ===================== */
  {
    category: "Setup & Config",
    commands: [
      {
        cmd: 'git config --global user.name "name"',
        desc: "Set global username",
      },
      {
        cmd: 'git config --global user.email "email"',
        desc: "Set global email",
      },
      {
        cmd: "git config --global core.editor code",
        desc: "Set default editor",
      },
      {
        cmd: "git config --global init.defaultBranch main",
        desc: "Set default branch name",
      },
      {
        cmd: "git config --global color.ui auto",
        desc: "Enable colored output",
      },
      {
        cmd: "git config --global credential.helper store",
        desc: "Store credentials",
      },
      { cmd: "git config --list", desc: "List all Git configuration" },
      { cmd: "git init", desc: "Initialize repository" },
    ],
  },

  {
    category: "Cloning & Files",
    commands: [
      { cmd: "git clone <repo-url>", desc: "Clone a repository" },
      { cmd: "git ls-files", desc: "List tracked files" },
      { cmd: "git show <commit>", desc: "Show commit details" },
      {
        cmd: "git checkout <commit> -- <file>",
        desc: "Restore file from commit",
      },
      {
        cmd: "git archive --format=zip HEAD > app.zip",
        desc: "Export repository",
      },
      { cmd: "git shortlog -sn", desc: "Contributor summary" },
      { cmd: "git fsck", desc: "Verify repository integrity" },
      { cmd: "git gc", desc: "Garbage collect repository" },
    ],
  },

  /* ===================== STATUS & DIFF ===================== */
  {
    category: "Status & Diff",
    commands: [
      { cmd: "git status", desc: "Show working tree status" },
      { cmd: "git status -sb", desc: "Short status with branch info" },
      { cmd: "git diff", desc: "Show unstaged changes" },
      { cmd: "git diff --staged", desc: "Show staged changes" },
      { cmd: "git diff HEAD", desc: "Show all changes vs last commit" },
      { cmd: "git log --oneline", desc: "Compact commit history" },
      { cmd: "git log --stat", desc: "Commit stats" },
      { cmd: "git log --oneline --graph --all", desc: "Visual history graph" },
    ],
  },

  /* ===================== STAGING ===================== */
  {
    category: "Staging",
    commands: [
      { cmd: "git add <file>", desc: "Stage a file" },
      { cmd: "git add .", desc: "Stage all changes" },
      { cmd: "git add -A", desc: "Stage including deletions" },
      { cmd: "git add -p", desc: "Stage interactively" },
      { cmd: "git restore <file>", desc: "Discard changes" },
      { cmd: "git restore --staged <file>", desc: "Unstage file" },
      { cmd: "git stash", desc: "Stash changes" },
      { cmd: "git stash list", desc: "List stashes" },
    ],
  },

  /* ===================== COMMITTING ===================== */
  {
    category: "Committing",
    commands: [
      { cmd: 'git commit -m "message"', desc: "Commit staged changes" },
      { cmd: "git commit --amend", desc: "Modify last commit" },
      {
        cmd: "git commit --amend --no-edit",
        desc: "Amend without editing message",
      },
      { cmd: "git revert <commit>", desc: "Create undo commit" },
      { cmd: "git reset --soft HEAD~1", desc: "Undo commit, keep staged" },
      { cmd: "git reset --mixed HEAD~1", desc: "Undo commit, keep unstaged" },
      { cmd: "git reset --hard HEAD~1", desc: "Discard commit & changes" },
      { cmd: "git reflog", desc: "Reference history" },
    ],
  },

  /* ===================== BRANCHING ===================== */
  {
    category: "Branching",
    commands: [
      { cmd: "git branch", desc: "List local branches" },
      { cmd: "git branch -a", desc: "List all branches" },
      { cmd: "git branch -vv", desc: "Show branch tracking" },
      { cmd: "git branch <name>", desc: "Create branch" },
      { cmd: "git branch -d <name>", desc: "Delete branch" },
      { cmd: "git branch -D <name>", desc: "Force delete branch" },
      { cmd: "git switch <branch>", desc: "Switch branch" },
      { cmd: "git switch -c <name>", desc: "Create & switch branch" },
    ],
  },

  /* ===================== MERGING & REBASE ===================== */
  {
    category: "Merging & Rebase",
    commands: [
      { cmd: "git merge <branch>", desc: "Merge branch" },
      { cmd: "git merge --no-ff <branch>", desc: "Force merge commit" },
      { cmd: "git merge --abort", desc: "Abort merge" },
      { cmd: "git rebase <branch>", desc: "Rebase branch" },
      { cmd: "git rebase -i HEAD~n", desc: "Interactive rebase" },
      { cmd: "git rebase --continue", desc: "Continue rebase" },
      { cmd: "git rebase --abort", desc: "Abort rebase" },
      { cmd: "git rebase --skip", desc: "Skip commit" },
    ],
  },

  /* ===================== REMOTES ===================== */
  {
    category: "Remotes",
    commands: [
      { cmd: "git remote -v", desc: "List remotes" },
      { cmd: "git remote show origin", desc: "Inspect remote" },
      { cmd: "git remote add origin <url>", desc: "Add remote" },
      { cmd: "git remote rename origin upstream", desc: "Rename remote" },
      { cmd: "git remote remove origin", desc: "Remove remote" },
      { cmd: "git fetch", desc: "Fetch changes" },
      { cmd: "git fetch --all --prune", desc: "Fetch & prune" },
      { cmd: "git pull", desc: "Fetch & merge" },
    ],
  },

  /* ===================== PUSH & UPSTREAM ===================== */
  {
    category: "Push & Upstream",
    commands: [
      { cmd: "git push", desc: "Push commits" },
      { cmd: "git push -u origin <branch>", desc: "Push & set upstream" },
      {
        cmd: "git push --set-upstream origin <branch>",
        desc: "Explicit upstream push",
      },
      {
        cmd: "git branch --set-upstream-to=origin/<branch>",
        desc: "Set upstream manually",
      },
      { cmd: "git branch --unset-upstream", desc: "Remove upstream" },
      { cmd: "git pull --rebase", desc: "Pull with rebase" },
      { cmd: "git push --force-with-lease", desc: "Safe force push" },
      {
        cmd: "git rev-parse --abbrev-ref --symbolic-full-name @{u}",
        desc: "Show upstream branch",
      },
    ],
  },

  /* ===================== STASH & CLEAN ===================== */
  {
    category: "Stash & Clean",
    commands: [
      { cmd: 'git stash push -m "message"', desc: "Stash with message" },
      { cmd: "git stash show -p", desc: "Show stash diff" },
      { cmd: "git stash apply", desc: "Apply stash" },
      { cmd: "git stash pop", desc: "Apply & remove stash" },
      { cmd: "git stash drop", desc: "Delete stash" },
      { cmd: "git stash clear", desc: "Clear all stashes" },
      { cmd: "git clean -n", desc: "Preview clean" },
      { cmd: "git clean -fd", desc: "Force clean files & dirs" },
    ],
  },

  /* ===================== TAGS & DEBUG ===================== */
  {
    category: "Tags & Debugging",
    commands: [
      { cmd: "git tag", desc: "List tags" },
      { cmd: "git tag <name>", desc: "Create lightweight tag" },
      { cmd: 'git tag -a <name> -m "message"', desc: "Create annotated tag" },
      { cmd: "git tag -d <name>", desc: "Delete tag" },
      { cmd: "git push origin <tag>", desc: "Push tag" },
      { cmd: "git push origin --tags", desc: "Push all tags" },
      { cmd: "git blame <file>", desc: "Line author info" },
      { cmd: "git bisect start", desc: "Start bug bisect" },
    ],
  },
];
