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
      { cmd: "git init", desc: "Initialize a new local repository" },
      { cmd: "git clone <repo-url>", desc: "Clone a remote repository" },
    ],
  },

  /* ===================== STATUS & HISTORY ===================== */
  {
    category: "Repository Status & History",
    commands: [
      { cmd: "git status", desc: "Show working tree status" },
      { cmd: "git status -sb", desc: "Short status with branch info" },
      { cmd: "git diff", desc: "Show unstaged changes" },
      { cmd: "git diff --staged", desc: "Show staged changes" },
      { cmd: "git diff HEAD", desc: "Show all changes vs last commit" },
      { cmd: "git log", desc: "Show commit history" },
      { cmd: "git log --oneline", desc: "Compact commit history" },
      { cmd: "git log --stat", desc: "Show commit stats" },
      { cmd: "git log --oneline --graph --all", desc: "Visual commit graph" },
      { cmd: "git show <commit>", desc: "Show commit details" },
      { cmd: "git ls-files", desc: "List tracked files" },
    ],
  },

  /* ===================== STAGING & COMMITTING ===================== */
  {
    category: "Staging & Committing",
    commands: [
      { cmd: "git add <file>", desc: "Stage a specific file" },
      { cmd: "git add .", desc: "Stage all changes" },
      { cmd: "git add -A", desc: "Stage all changes (including deletions)" },
      { cmd: "git add -p", desc: "Stage changes interactively" },
      { cmd: 'git commit -m "message"', desc: "Commit staged changes" },
      { cmd: "git commit --amend", desc: "Modify last commit" },
      {
        cmd: "git commit --amend --no-edit",
        desc: "Amend without changing message",
      },
      { cmd: "git restore <file>", desc: "Discard working directory changes" },
      { cmd: "git restore --staged <file>", desc: "Unstage a file" },
    ],
  },

  /* ===================== BRANCHING & MERGING ===================== */
  {
    category: "Branching & Merging",
    commands: [
      { cmd: "git branch", desc: "List local branches" },
      { cmd: "git branch -a", desc: "List all branches" },
      { cmd: "git branch -vv", desc: "Show branches with upstream info" },
      { cmd: "git branch <name>", desc: "Create a branch" },
      { cmd: "git checkout <branch>", desc: "Switch branch (legacy)" },
      { cmd: "git checkout -b <name>", desc: "Create and switch branch" },
      { cmd: "git switch <branch>", desc: "Switch branch (modern)" },
      {
        cmd: "git switch -c <name>",
        desc: "Create and switch branch (modern)",
      },
      { cmd: "git merge <branch>", desc: "Merge branch into current" },
      { cmd: "git merge --no-ff <branch>", desc: "Force merge commit" },
      { cmd: "git merge --abort", desc: "Abort merge" },
      { cmd: "git branch -d <name>", desc: "Delete local branch" },
      { cmd: "git branch -D <name>", desc: "Force delete local branch" },
    ],
  },

  /* ===================== UPSTREAM & TRACKING ===================== */
  {
    category: "Upstream & Tracking",
    commands: [
      { cmd: "git push -u origin <branch>", desc: "Push and set upstream" },
      {
        cmd: "git push --set-upstream origin <branch>",
        desc: "Explicit upstream push",
      },
      {
        cmd: "git branch --set-upstream-to=origin/<branch>",
        desc: "Set upstream manually",
      },
      { cmd: "git branch --unset-upstream", desc: "Remove upstream tracking" },
      {
        cmd: "git rev-parse --abbrev-ref --symbolic-full-name @{u}",
        desc: "Show upstream branch",
      },
    ],
  },

  /* ===================== REMOTES ===================== */
  {
    category: "Remote Repositories",
    commands: [
      { cmd: "git remote -v", desc: "Show remote repositories" },
      { cmd: "git remote show origin", desc: "Inspect remote details" },
      { cmd: "git remote add origin <url>", desc: "Add remote repository" },
      { cmd: "git remote rename origin upstream", desc: "Rename remote" },
      { cmd: "git remote remove origin", desc: "Remove remote" },
      { cmd: "git fetch", desc: "Fetch updates" },
      {
        cmd: "git fetch --all --prune",
        desc: "Fetch and clean deleted branches",
      },
      { cmd: "git pull", desc: "Fetch and merge changes" },
      { cmd: "git pull --rebase", desc: "Pull with rebase" },
      { cmd: "git push", desc: "Push commits" },
      { cmd: "git push --force-with-lease", desc: "Safe force push" },
    ],
  },

  /* ===================== STASH ===================== */
  {
    category: "Stashing",
    commands: [
      { cmd: "git stash", desc: "Stash current changes" },
      { cmd: 'git stash push -m "message"', desc: "Stash with message" },
      { cmd: "git stash list", desc: "List stashes" },
      { cmd: "git stash show -p", desc: "Show stash diff" },
      { cmd: "git stash apply", desc: "Apply stash" },
      { cmd: "git stash pop", desc: "Apply and remove stash" },
      { cmd: "git stash drop", desc: "Delete stash" },
      { cmd: "git stash clear", desc: "Delete all stashes" },
    ],
  },

  /* ===================== RESET / REVERT / RECOVERY ===================== */
  {
    category: "Reset, Revert & Recovery",
    commands: [
      { cmd: "git reset --soft HEAD~1", desc: "Undo commit, keep staged" },
      { cmd: "git reset --mixed HEAD~1", desc: "Undo commit, keep unstaged" },
      { cmd: "git reset --hard HEAD~1", desc: "Discard commit and changes" },
      { cmd: "git revert <commit>", desc: "Create undo commit" },
      { cmd: "git reflog", desc: "Reference history" },
      {
        cmd: "git checkout <commit> -- <file>",
        desc: "Restore file from commit",
      },
    ],
  },

  /* ===================== REBASE ===================== */
  {
    category: "Rebase (Advanced)",
    commands: [
      { cmd: "git rebase <branch>", desc: "Rebase current branch" },
      { cmd: "git rebase -i HEAD~n", desc: "Interactive rebase" },
      { cmd: "git rebase --continue", desc: "Continue rebase" },
      { cmd: "git rebase --abort", desc: "Abort rebase" },
      { cmd: "git rebase --skip", desc: "Skip commit" },
    ],
  },

  /* ===================== TAGS ===================== */
  {
    category: "Tags & Releases",
    commands: [
      { cmd: "git tag", desc: "List tags" },
      { cmd: "git tag <name>", desc: "Create lightweight tag" },
      { cmd: 'git tag -a <name> -m "message"', desc: "Create annotated tag" },
      { cmd: "git tag -d <name>", desc: "Delete tag" },
      { cmd: "git push origin <tag>", desc: "Push tag" },
      { cmd: "git push origin --tags", desc: "Push all tags" },
    ],
  },

  /* ===================== DEBUGGING ===================== */
  {
    category: "Inspection & Debugging (Professional)",
    commands: [
      { cmd: "git blame <file>", desc: "Line-by-line author info" },
      { cmd: "git bisect start", desc: "Start bug search" },
      { cmd: "git bisect bad", desc: "Mark bad commit" },
      { cmd: "git bisect good <commit>", desc: "Mark good commit" },
      { cmd: "git bisect reset", desc: "End bisect" },
      { cmd: "git fsck", desc: "Verify repository integrity" },
    ],
  },

  /* ===================== CLEANING ===================== */
  {
    category: "Cleaning & Maintenance",
    commands: [
      { cmd: "git clean -n", desc: "Preview untracked removal" },
      { cmd: "git clean -f", desc: "Remove untracked files" },
      { cmd: "git clean -fd", desc: "Remove files and directories" },
      { cmd: "git gc", desc: "Garbage collect repository" },
      { cmd: "git prune", desc: "Remove unreachable objects" },
    ],
  },

  /* ===================== WORKFLOWS ===================== */
  {
    category: "Workflows & Productivity (Pro)",
    commands: [
      {
        cmd: "git worktree add <path> <branch>",
        desc: "Multiple working trees",
      },
      { cmd: "git submodule add <repo>", desc: "Add submodule" },
      {
        cmd: "git submodule update --init --recursive",
        desc: "Init submodules",
      },
      {
        cmd: "git archive --format=zip HEAD > app.zip",
        desc: "Export repository",
      },
      { cmd: "git shortlog -sn", desc: "Contributor summary" },
    ],
  },
];
