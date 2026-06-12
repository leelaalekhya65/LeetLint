/* ============================================================
   LeetLint — Main Application Logic (Multi-Language)
   ============================================================ */

(function () {
  'use strict';

  const codeInput = document.getElementById('codeInput');
  const gutter = document.getElementById('gutter');
  const editorOverlay = document.getElementById('editorOverlay');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resetBtn = document.getElementById('resetBtn');
  const lineCount = document.getElementById('lineCount');
  const charCount = document.getElementById('charCount');
  const langBadge = document.getElementById('langBadge');
  const langSelect = document.getElementById('langSelect');

  const errorsList = document.getElementById('errorsList');
  const errorCount = document.getElementById('errorCount');
  const resourcesList = document.getElementById('resourcesList');
  const resourceCount = document.getElementById('resourceCount');
  const solutionsList = document.getElementById('solutionsList');
  const solutionCount = document.getElementById('solutionCount');

  let currentErrors = [];
  let currentProblem = null;

  // ---- Starter code per language ----
  const CODE_SAMPLES = {
    javascript: `function twoSum(nums, target) {
  var map = {};
  for (let i = 0; i < nums.length; i++) {
    complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i
  }
  return []
}

console.log(twoSum([2, 7, 11, 15], 9))`,

    python: `def two_sum(nums, target)
  seen = {}
  for i, num in enumerate(nums):
    complement = target - num
    if complement = seen:
      return [seen[complement], i]
    seen[num] = i
  return []

print(two_sum([2, 7, 11, 15], 9))`,

    java: `public class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>()
    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (map.containsKey(complement)) {
        return new int[] { map.get(complement), i };
      }
      System.out.println(map);
      map.put(nums[i], i);
    }
    return new int[] {};
  }
}`,

    cpp: `class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
      int complement = target - nums[i];
      if (map.count(complement)) {
        return {map[complement], i};
      }
      map[nums[i]] = i
    }
    return {};
  }
};`,

    c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
  for (int i = 0; i < numsSize; i++) {
    for (int j = i + 1; j < numsSize; j++) {
      if (nums[i] + nums[j] = target) {
        int* result = (int*)malloc(2 * sizeof(int));
        printf("found! %d %d\\n", i, j);
        result[0] = i;
        result[1] = j;
        *returnSize = 2;
        return result;
      }
    }
  }
  *returnSize = 0;
  return NULL;
}`,
  };

  // ---- Get current language ----
  function getLanguage() {
    return langSelect ? langSelect.value : 'javascript';
  }

  // ---- Initialize ----
  function init() {
    loadCodeForLanguage(getLanguage());
    updateEditor();
    runAnalysis();
  }

  // ---- Load code sample for language ----
  function loadCodeForLanguage(lang) {
    codeInput.value = CODE_SAMPLES[lang] || CODE_SAMPLES.javascript;
    updateEditor();
  }

  // ---- Update gutter & stats ----
  function updateEditor() {
    const text = codeInput.value;
    const lines = text.split('\n');
    const lang = getLanguage();

    // Gutter
    gutter.innerHTML = lines
      .map((_, i) => `<div class="gutter-line" data-line="${i + 1}">${i + 1}</div>`)
      .join('');

    // Stats
    lineCount.textContent = `Lines: ${lines.length}`;
    charCount.textContent = `Chars: ${text.length}`;

    // Badge
    const langInfo = Analyzer.LANGUAGES[lang];
    langBadge.textContent = langInfo ? langInfo.name : 'JavaScript';

    // Auto-resize textarea
    codeInput.style.height = 'auto';
    codeInput.style.height = Math.max(500, codeInput.scrollHeight) + 'px';

    // Clear overlay
    editorOverlay.innerHTML = '';
  }

  // ---- Run Analysis ----
  function runAnalysis() {
    const code = codeInput.value;
    const lang = getLanguage();

    currentErrors = Analyzer.detectErrors(code, lang);
    currentProblem = Analyzer.guessProblem(code, lang);

    updateGutterMarks();
    highlightErrorsInEditor();
    renderErrors();
    renderResources(lang);
    renderSolutions();
  }

  // ---- Update Gutter Marks ----
  function updateGutterMarks() {
    const gutterLines = gutter.querySelectorAll('.gutter-line');
    gutterLines.forEach(el => el.classList.remove('error', 'warning'));

    currentErrors.forEach(err => {
      const el = gutter.querySelector(`.gutter-line[data-line="${err.line}"]`);
      if (el) el.classList.add(err.type === 'warning' ? 'warning' : 'error');
    });
  }

  // ---- Highlight Errors in Editor ----
  function highlightErrorsInEditor() {
    editorOverlay.innerHTML = '';
    const lines = codeInput.value.split('\n');
    const lineHeight = calculateLineHeight();

    currentErrors.forEach(err => {
      const idx = err.line - 1;
      if (idx >= 0 && idx < lines.length) {
        const hl = document.createElement('div');
        hl.className = err.type === 'warning' ? 'warning-highlight' : 'error-highlight';
        hl.style.top = `${idx * lineHeight}px`;
        hl.style.height = `${lineHeight}px`;
        hl.title = `${err.title}: ${err.description}`;
        editorOverlay.appendChild(hl);
      }
    });
  }

  function calculateLineHeight() {
    const fs = parseFloat(getComputedStyle(codeInput).fontSize) || 14;
    return parseFloat(getComputedStyle(codeInput).lineHeight) || fs * 1.6;
  }

  // ---- Render Errors ----
  function renderErrors() {
    if (currentErrors.length === 0) {
      errorCount.textContent = '0';
      errorsList.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">✓</span>
          <p>No issues detected. Your code looks clean!</p>
        </div>`;
      return;
    }

    errorCount.textContent = currentErrors.length;
    const errors = currentErrors.filter(e => e.type === 'error');
    const warnings = currentErrors.filter(e => e.type === 'warning');
    let html = '';

    if (errors.length > 0) {
      html += `<div style="font-size:0.75rem;font-weight:600;color:var(--clr-error-text);margin-bottom:6px;">✗ ${errors.length} Error${errors.length > 1 ? 's' : ''}</div>`;
      errors.forEach(err => {
        html += `
          <div class="error-item" data-line="${err.line}">
            <span class="error-line-tag">Line ${err.line}</span>
            <div class="error-body">
              <div class="error-title">${escapeHtml(err.title)}</div>
              <div class="error-desc">${escapeHtml(err.description)}</div>
            </div>
          </div>`;
      });
    }

    if (warnings.length > 0) {
      html += `<div style="font-size:0.75rem;font-weight:600;color:var(--clr-warning-text);margin:8px 0 6px;">⚠ ${warnings.length} Warning${warnings.length > 1 ? 's' : ''}</div>`;
      warnings.forEach(err => {
        html += `
          <div class="error-item warning" data-line="${err.line}">
            <span class="error-line-tag">Line ${err.line}</span>
            <div class="error-body">
              <div class="error-title">${escapeHtml(err.title)}</div>
              <div class="error-desc">${escapeHtml(err.description)}</div>
            </div>
          </div>`;
      });
    }

    errorsList.innerHTML = html;

    errorsList.querySelectorAll('.error-item').forEach(el => {
      el.addEventListener('click', () => {
        scrollToLine(parseInt(el.dataset.line, 10));
      });
    });
  }

  // ---- Render Resources ----
  function renderResources(language) {
    const seenTitles = new Set();
    let resources = [];
    const usedTopics = new Set();

    currentErrors.forEach(err => {
      const topic = ResourceDB.getResourcesForError(err, language);
      if (topic && !usedTopics.has(topic.title)) {
        usedTopics.add(topic.title);
        resources = resources.concat(topic.resources || []);
      }
    });

    if (resources.length === 0) {
      resourceCount.textContent = '0';
      resourcesList.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">📖</span>
          <p>Resources will appear once errors are detected.</p>
        </div>`;
      return;
    }

    resources = resources.filter(r => {
      const key = r.title;
      if (seenTitles.has(key)) return false;
      seenTitles.add(key);
      return true;
    });

    resourceCount.textContent = resources.length;
    let html = '';
    resources.forEach(r => {
      const url = escapeHtml(r.url);
      html += `
        <div class="resource-item">
          <div class="resource-icon">${r.icon}</div>
          <div class="resource-body">
            <div class="resource-title">${escapeHtml(r.title)}</div>
            <div class="resource-desc">${escapeHtml(r.desc)}</div>
            <a class="resource-link" href="${url}" target="_blank" rel="noopener" data-url="${url}">View resource →</a>
          </div>
        </div>`;
    });
    resourcesList.innerHTML = html;

    // Click fallback for resource links (handles popup blockers)
    resourcesList.querySelectorAll('.resource-link').forEach(a => {
      a.addEventListener('click', function(e) {
        const url = this.dataset.url || this.href;
        if (!url) return;
        e.preventDefault();
        const w = window.open(url, '_blank');
        if (!w || w.closed || typeof w.closed === 'undefined') {
          window.location.href = url;
        }
      });
    });
  }

  // ---- Render Solutions ----
  function renderSolutions() {
    const solutions = ResourceDB.getSolutionsForProblem(currentProblem);
    solutionCount.textContent = solutions.length;
    let html = '';

    if (currentProblem && ResourceDB.problemSolutions[currentProblem]) {
      html += `<div style="font-size:0.72rem;font-weight:500;color:var(--clr-accent);margin-bottom:6px;">Problem: ${formatProblemName(currentProblem)}</div>`;
    }

    solutions.forEach(s => {
      const videoUrl = s.video ? escapeHtml(s.video) : '';
      html += `
        <div class="solution-item">
          <div class="solution-header">
            <span class="solution-name">${escapeHtml(s.name)}</span>
            ${s.complexity ? `<span class="solution-complexity">${escapeHtml(s.complexity)}</span>` : ''}
          </div>
          <div class="solution-desc">${escapeHtml(s.desc)}</div>
          ${videoUrl ? `<a class="solution-video-link" href="${videoUrl}" target="_blank" rel="noopener" data-url="${videoUrl}">▶ Watch video tutorial</a>` : ''}
        </div>`;
    });
    solutionsList.innerHTML = html;

    // Click fallback for approach video links
    solutionsList.querySelectorAll('.solution-video-link').forEach(a => {
      a.addEventListener('click', function(e) {
        const url = this.dataset.url || this.href;
        if (!url) return;
        e.preventDefault();
        const w = window.open(url, '_blank');
        if (!w || w.closed || typeof w.closed === 'undefined') {
          window.location.href = url;
        }
      });
    });
  }

  // ---- Scroll to line ----
  function scrollToLine(line) {
    const lh = calculateLineHeight();
    codeInput.focus();
    codeInput.scrollTop = (line - 1) * lh;

    const gl = gutter.querySelector(`.gutter-line[data-line="${line}"]`);
    if (gl) {
      gl.style.transition = 'background 0.3s';
      gl.style.background = 'var(--clr-gold-light)';
      setTimeout(() => { gl.style.background = ''; }, 800);
    }
  }

  // ---- Helpers ----
  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function formatProblemName(key) {
    return key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // ---- Event Listeners ----
  codeInput.addEventListener('input', updateEditor);

  langSelect.addEventListener('change', () => {
    loadCodeForLanguage(getLanguage());
    runAnalysis();
  });

  analyzeBtn.addEventListener('click', runAnalysis);

  resetBtn.addEventListener('click', () => {
    loadCodeForLanguage(getLanguage());
    runAnalysis();
  });

  codeInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runAnalysis();
    }
  });

  codeInput.addEventListener('scroll', () => {
    gutter.scrollTop = codeInput.scrollTop;
    editorOverlay.scrollTop = codeInput.scrollTop;
  });

  // ---- Start ----
  init();

})();
