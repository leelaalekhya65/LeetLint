/* ============================================================
   LeetLint — Code Analyzer Engine (Multi-Language)
   ============================================================ */

const Analyzer = {

  LANGUAGES: {
    javascript: { name: 'JavaScript', ext: 'js' },
    python:     { name: 'Python',     ext: 'py' },
    java:       { name: 'Java',       ext: 'java' },
    cpp:        { name: 'C++',        ext: 'cpp' },
    c:          { name: 'C',          ext: 'c' },
  },

  detectErrors(code, language) {
    const errors = [];
    const lines = code.split('\n');

    switch (language) {
      case 'python': this._checkPython(code, errors, lines); break;
      case 'java':   this._checkJava(code, errors, lines);   break;
      case 'cpp':    this._checkCpp(code, errors, lines);    break;
      case 'c':      this._checkC(code, errors, lines);      break;
      default:       this._checkJS(code, errors, lines);     break;
    }

    this._checkLongLines(lines, errors);
    this._checkTodo(code, errors);
    this._checkNesting(lines, errors);

    return errors;
  },

  /* ================================================================
     JAVASCRIPT
     ================================================================ */
  _checkJS(code, errors, lines) {
    try { new Function(code); } catch (e) {
      const msg = e.message || '';
      let line = this._extractLineFromError(e, msg, code) || 1;
      errors.push({ type: 'error', line, title: 'Syntax Error', description: msg });
    }

    lines.forEach((line, i) => {
      const n = i + 1, s = line.replace(/\/\/.*$/, '').trim();
      if (!s) return;

      if (/(?:if|while|else\s+if)\s*\([^)]*\)/.test(s) &&
          /(?:if|while)\s*\([^)]*=[^=][^)]*\)/.test(s) &&
          !/===|!==|<=|>=|=>/.test(s))
        errors.push({ type: 'error', line: n, title: 'Assignment in Condition',
          description: 'Using = instead of === in a condition. This assigns instead of comparing.' });

      if (/^var\s/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Avoid var',
          description: 'Use let or const instead of var for block scoping.' });

      if (/console\.(log|warn|error)/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Debugging Statement',
          description: 'console.log() was found. Remove before submission.' });

      if (/==[^=]/.test(s) && !/===/.test(s) && !/==>/.test(s) && !/=>/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Loose Equality',
          description: 'Use === instead of == to avoid type coercion bugs.' });
    });

    if (/function\s+\w+/.test(code) && !/\breturn\b/.test(code) &&
        /(?:var|let|const)\s/.test(code))
      errors.push({ type: 'warning', line: 1, title: 'Function May Be Missing Return',
        description: 'You defined a function but no return statement was found.' });

    const fm = code.match(/for\s*\(([^;]+);([^;]+);([^)]+)\)/);
    if (fm) {
      const cond = fm[2].trim();
      if (cond === 'true' || cond === '1')
        errors.push({ type: 'error', line: this._findLine(code, 'for'),
          title: 'Potential Infinite Loop',
          description: 'Loop condition is always true unless there is a break inside.' });
      if (/[^=<>!]=[^=]/.test(cond) && !/===/.test(cond) && !/=>/.test(cond))
        errors.push({ type: 'error', line: this._findLine(code, 'for'),
          title: 'Assignment in Loop Condition',
          description: 'Loop condition contains = instead of ===. May cause infinite loop.' });
    }

    this._checkUnusedVarsJS(code, errors);
  },

  _checkUnusedVarsJS(code, errors) {
    const decls = code.match(/(?:let|const|var)\s+(\w+)/g) || [];
    decls.forEach((d) => {
      const name = d.split(/\s+/)[1];
      if (['i','j','k','n','idx','index','len','result','res','arr','str'].includes(name)) return;
      const idx = code.indexOf(d);
      const after = code.substring(idx + d.length);
      const count = (after.match(new RegExp(`\\b${name}\\b`, 'g')) || []).length;
      if (count <= 1 && after.length > 20) {
        const line = code.substring(0, idx).split('\n').length;
        errors.push({ type: 'warning', line, title: 'Potentially Unused Variable',
          description: `'${name}' is declared but only used ${count} time(s).` });
      }
    });
  },

  /* ================================================================
     PYTHON
     ================================================================ */
  _checkPython(code, errors, lines) {
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const trimmed = raw.trimLeft();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const indent = raw.length - trimmed.length;

      if (trimmed.endsWith(':') && !trimmed.startsWith('#')) {
        let j = i + 1;
        while (j < lines.length && !lines[j].trim()) j++;
        if (j < lines.length) {
          const nextIndent = lines[j].length - lines[j].trimLeft().length;
          if (nextIndent <= indent && !lines[j].trim().startsWith('#')) {
            errors.push({ type: 'error', line: j + 1, title: 'Missing Indentation',
              description: 'Expected indented block after ' + trimmed.split(' ')[0] + ' on line ' + (i+1) + '.' });
          }
        }
      }
    }

    lines.forEach((line, i) => {
      const n = i + 1, s = line.trim();
      if (!s || s.startsWith('#')) return;

      if (/^\s*(?:if|elif|while)\s*\(/.test(line) && /\([^)]*=[^=][^)]*\)/.test(line) ||
          /^\s*(?:if|elif|while)\s+.*[^=!<>]=[^=].*:/.test(line) && !/==/.test(line) && !/!=/.test(line) && !/<=/.test(line) && !/>=/.test(line))
        errors.push({ type: 'error', line: n, title: 'Assignment in Condition',
          description: 'Using = instead of == in a condition. Use == for comparison.' });

      if (/--|\+\+/.test(s))
        errors.push({ type: 'error', line: n, title: 'Invalid Operator',
          description: 'Python does not support ++ or --. Use += 1 or -= 1.' });

      if (/&&/.test(s))
        errors.push({ type: 'error', line: n, title: 'Invalid Operator',
          description: 'Use "and" instead of && in Python.' });
      if (/\|\|/.test(s))
        errors.push({ type: 'error', line: n, title: 'Invalid Operator',
          description: 'Use "or" instead of || in Python.' });

      if (/def\s+\w+\s*\([^)]*=\s*\[\s*\]/.test(line) || /def\s+\w+\s*\([^)]*=\s*\{\s*\}/.test(line) || /def\s+\w+\s*\([^)]*=\s*set\s*\(\s*\)/.test(line))
        errors.push({ type: 'warning', line: n, title: 'Mutable Default Argument',
          description: 'Using a mutable default argument ([] or {}). Can cause unexpected behaviour across calls. Use None instead.' });

      if (/print\s*\(/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Debugging Statement',
          description: 'print() was found. Remove before submission.' });

      if (/^\s*(?:if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(s) && !s.endsWith(':'))
        errors.push({ type: 'error', line: n, title: 'Missing Colon',
          description: 'Expected ":" at the end of this ' + s.split(/\s+/)[0] + ' statement.' });

      if (/type\s*\(/.test(s) && /==/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Type Comparison',
          description: 'Use isinstance() instead of comparing with type().' });

      if (/^\s*except\s*:/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Bare Except',
          description: 'A bare except: catches all exceptions including SystemExit. Use except Exception:' });

      if (/\.length\b/.test(s))
        errors.push({ type: 'error', line: n, title: 'No .length in Python',
          description: 'Python uses len() not .length. Use len(...).' });
      if (/\.push\s*\(/.test(s))
        errors.push({ type: 'error', line: n, title: 'No .push in Python',
          description: 'Python uses .append() not .push().' });
      if (/null\b/.test(s) && !/isnull|None/.test(s))
        errors.push({ type: 'error', line: n, title: 'Use None, not null',
          description: 'Python uses None instead of null.' });
      if (/true\b/.test(s) && !/True/.test(s))
        errors.push({ type: 'error', line: n, title: 'Use True (capitalized)',
          description: 'Python boolean literals are True/False.' });
      if (/false\b/.test(s) && !/False/.test(s))
        errors.push({ type: 'error', line: n, title: 'Use False (capitalized)',
          description: 'Python boolean literals are True/False.' });
      if (/undefined\b/.test(s))
        errors.push({ type: 'error', line: n, title: 'No undefined in Python',
          description: 'Python has no undefined. Use None.' });
    });

    const hasDef = /def\s+\w+\s*\(/.test(code);
    const hasReturn = /\breturn\b/.test(code);
    if (hasDef && !hasReturn)
      errors.push({ type: 'warning', line: 1, title: 'Function May Be Missing Return',
        description: 'You defined a function but no return statement was found.' });
  },

  /* ================================================================
     JAVA
     ================================================================ */
  _checkJava(code, errors, lines) {
    if (!/class\s+\w+/.test(code))
      errors.push({ type: 'error', line: 1, title: 'Missing Class Definition',
        description: 'Java requires a class declaration. Use: public class Solution { ... }' });

    lines.forEach((line, i) => {
      const n = i + 1, s = line.replace(/\/\/.*$/, '').trim();
      if (!s || s.startsWith('@') || s.startsWith('import') || s.startsWith('package')) return;

      const stmtEnd = /^(?:int|double|float|long|boolean|char|byte|short|String|var|\w+\s*=|return|throw|break|continue)\b/.test(s);
      const hasSC = s.endsWith(';');
      const isBlock = s.endsWith('{') || s.endsWith('}') || s.endsWith('){');
      const isControl = /^(?:if|else|for|while|do|switch|try|catch|finally|public|private|protected|static|class|interface|enum|void)\b/.test(s);
      if (stmtEnd && !hasSC && !isBlock && !isControl)
        errors.push({ type: 'error', line: n, title: 'Missing Semicolon',
          description: 'Java statements must end with a semicolon.' });

      if ((/^\s*(?:if|while|else\s+if)\s*\(/.test(line) || /^\s*for\s*\([^;]+;[^;]+/.test(line)) &&
          /\([^)]*=[^=][^)]*\)/.test(line) && !/===/.test(s) && !/<=|>=/.test(s))
        errors.push({ type: 'error', line: n, title: 'Assignment in Condition',
          description: 'Using = instead of == in a condition. Use == for comparison in Java.' });

      // String == comparison — only check if line has " with == directly
      if (/".*==/.test(s) || /==.*"/.test(s))
        errors.push({ type: 'error', line: n, title: 'String Comparison with ==',
          description: 'Use .equals() to compare strings in Java, not ==.' });

      if (/System\.(out|err)\.(print|println)/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Debugging Statement',
          description: 'System.out.println() was found. Remove before submission.' });

      if (/case\s+/.test(s) && !/break/.test(s)) {
        const nl = i + 1 < lines.length ? lines[i + 1].trim() : '';
        if (!nl.startsWith('case') && !nl.startsWith('}') && !nl.startsWith('break') && !nl.startsWith('return'))
          errors.push({ type: 'warning', line: n, title: 'Possible Fall-through',
            description: 'This case may be missing a break statement.' });
      }
    });

    if (/\b(?:int|double|float|long|boolean|char|String|short|byte)\b/.test(code) &&
        !/\breturn\b/.test(code))
      errors.push({ type: 'warning', line: 1, title: 'Method May Be Missing Return',
        description: 'A method with a return type was found but no return statement.' });
  },

  /* ================================================================
     C++
     ================================================================ */
  _checkCpp(code, errors, lines) {
    if (code.trim() && !/^\s*#include/.test(code.trim()))
      errors.push({ type: 'warning', line: 1, title: 'Missing #include Directive',
        description: 'No #include found. Add necessary headers like <bits/stdc++.h>.' });

    lines.forEach((line, i) => {
      const n = i + 1, s = line.replace(/\/\/.*$/, '').trim();
      if (!s || s.startsWith('#')) return;

      const stmtEnd = /^(?:int|double|float|long|bool|char|auto|string|vector|map|set|\w+<|\w+\s*=|return|throw|break|continue|cout|cin)\b/.test(s);
      const hasSC = s.endsWith(';');
      const isBlock = s.endsWith('{') || s.endsWith('}') || s.endsWith('){');
      const isControl = /^(?:if|else|for|while|do|switch|try|catch|class|struct|enum|namespace|using|template|public|private|protected|virtual|override)\b/.test(s);
      if (stmtEnd && !hasSC && !isBlock && !isControl)
        errors.push({ type: 'error', line: n, title: 'Missing Semicolon',
          description: 'C++ statements must end with a semicolon.' });

      if (/^\s*(?:if|while|else\s+if)\s*\(/.test(line) &&
          /\([^)]*=[^=][^)]*\)/.test(line) && !/===/.test(s) && !/<=|>=/.test(s))
        errors.push({ type: 'error', line: n, title: 'Assignment in Condition',
          description: 'Using = instead of == in a condition. Use == for comparison.' });

      if (/\bcout\b/.test(s) || /\bprintf\s*\(/.test(s) || /\bcerr\b/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Debugging Statement',
          description: 'Output statement found. Remove before submission.' });

      if (/\bgets\s*\(/.test(s))
        errors.push({ type: 'error', line: n, title: 'Unsafe Function',
          description: 'gets() is dangerous. Use std::getline() or cin.' });

      if (/\bstrcmp\b/.test(s))
        errors.push({ type: 'warning', line: n, title: 'C-style String Compare',
          description: 'Using strcmp(). For std::string, use == directly.' });
    });

    // Check for new/delete and malloc/free once, not per line
    const hasNew = /\bnew\b/.test(code);
    const hasDelete = /\bdelete\b/.test(code);
    if (hasNew && !hasDelete)
      errors.push({ type: 'warning', line: 1, title: 'Potential Memory Leak',
        description: 'new operator is used but no delete found. Consider using smart pointers.' });

    if (/\bmalloc/.test(code) && !/free/.test(code))
      errors.push({ type: 'warning', line: 1, title: 'Potential Memory Leak',
        description: 'malloc() is used but no free() found.' });

    if (hasNew || hasDelete || /\bmalloc/.test(code)) {
      if (!hasNew && !hasDelete && !/\bmalloc/.test(code)) {}
    }

    const hasFunc = /(?:int|double|float|long|bool|char|string|vector|auto|long\s+long)\s+\w+\s*\(/.test(code);
    const hasReturn = /\breturn\b/.test(code);
    if (hasFunc && !hasReturn)
      errors.push({ type: 'warning', line: 1, title: 'Function May Be Missing Return',
        description: 'A function with a return type was defined but no return statement found.' });
  },

  /* ================================================================
     C
     ================================================================ */
  _checkC(code, errors, lines) {
    if (code.trim() && !/^\s*#include/.test(code.trim()))
      errors.push({ type: 'warning', line: 1, title: 'Missing #include Directive',
        description: 'No #include found. Add headers like <stdio.h>.' });

    lines.forEach((line, i) => {
      const n = i + 1, s = line.replace(/\/\/.*$/, '').trim();
      if (!s || s.startsWith('#')) return;

      const stmtEnd = /^(?:int|double|float|long|char|short|unsigned|signed|size_t|\w+\s*=|return|break|continue)\b/.test(s);
      const hasSC = s.endsWith(';');
      const isBlock = s.endsWith('{') || s.endsWith('}') || s.endsWith('){');
      const isControl = /^(?:if|else|for|while|do|switch|case|default|struct|typedef|enum|union|void|static|extern|const)\b/.test(s);
      if (stmtEnd && !hasSC && !isBlock && !isControl)
        errors.push({ type: 'error', line: n, title: 'Missing Semicolon',
          description: 'C statements must end with a semicolon.' });

      if (/^\s*(?:if|while|else\s+if)\s*\(/.test(line) &&
          /\([^)]*=[^=][^)]*\)/.test(line) && !/<=|>=/.test(s))
        errors.push({ type: 'error', line: n, title: 'Assignment in Condition',
          description: 'Using = instead of == in a condition. Use == for comparison.' });

      if (/scanf\s*\(/.test(s)) {
        const sc = s.match(/"([^"]*)"/);
        if (sc) {
          const args = s.split(',').slice(1).filter(a => a.trim());
          args.forEach((arg) => {
            const a = arg.trim().replace(/\)$/, '');
            if (a && !a.startsWith('&') && !a.startsWith('*') && !/^"\w*"$/.test(a) && !/^[\d\s]+$/.test(a))
              errors.push({ type: 'warning', line: n, title: 'Missing & in scanf',
                description: 'scanf() needs & before non-pointer variable: &' + a });
          });
        }
      }

      if (/\bprintf\s*\(/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Debugging Statement',
          description: 'printf() was found. Remove before submission.' });

      if (/\bgets\s*\(/.test(s))
        errors.push({ type: 'error', line: n, title: 'Unsafe Function',
          description: 'gets() is dangerous. Use fgets() instead.' });

      if (/\bstrcpy\s*\(/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Unsafe strcpy',
          description: 'strcpy() can overflow. Use strncpy() or snprintf().' });

      if (/\bsprintf\s*\(/.test(s))
        errors.push({ type: 'warning', line: n, title: 'Unsafe sprintf',
          description: 'sprintf() can overflow. Use snprintf().' });
    });

    if (/\bmalloc/.test(code) && !/free/.test(code))
      errors.push({ type: 'warning', line: 1, title: 'Potential Memory Leak',
        description: 'malloc() is used but no free() found.' });

    if (/\b(?:int|double|float|long|char|short|size_t)\s+\w+\s*\(/.test(code) && !/\breturn\b/.test(code))
      errors.push({ type: 'warning', line: 1, title: 'Function May Be Missing Return',
        description: 'A non-void function has no return statement.' });
  },

  /* ================================================================
     SHARED CHECKS
     ================================================================ */
  _checkLongLines(lines, errors) {
    lines.forEach((line, i) => {
      if (line.length > 120)
        errors.push({ type: 'warning', line: i + 1, title: 'Line Too Long',
          description: 'Line exceeds 120 characters. Consider breaking it up.' });
    });
  },

  _checkTodo(code, errors) {
    const m = code.match(/\/\/\s*TODO/i) || code.match(/#\s*TODO/i) || code.match(/\/\*\s*TODO/i);
    if (m) {
      const line = code.substring(0, code.indexOf('TODO')).split('\n').length;
      errors.push({ type: 'warning', line, title: 'Incomplete Code (TODO)',
        description: 'TODO comment left in the code.' });
    }
  },

  _checkNesting(lines, errors) {
    let max = 0, cur = 0;
    for (const line of lines) {
      cur += (line.match(/{/g) || []).length;
      cur -= (line.match(/}/g) || []).length;
      if (cur > max) max = cur;
    }
    if (max > 4)
      errors.push({ type: 'warning', line: lines.length, title: 'High Nesting Depth',
        description: `Nesting depth of ${max} levels. Consider refactoring.` });
  },

  _findLine(code, keyword) {
    return code.substring(0, code.indexOf(keyword)).split('\n').length;
  },

  _extractLineFromError(e, msg, code) {
    const m1 = msg.match(/(?:at\s+)?line\s+(\d+)/i);
    if (m1) return parseInt(m1[1], 10);
    const m2 = msg.match(/position\s+(\d+)/i);
    if (m2) return code.substring(0, parseInt(m2[1], 10)).split('\n').length;
    if (e.stack) {
      const m3 = e.stack.match(/:(\d+):\d+/);
      if (m3) return Math.max(1, parseInt(m3[1], 10) - 1);
    }
    return null;
  },

  /* ================================================================
     GUESS LEETCODE PROBLEM
     ================================================================ */
  guessProblem(code, language) {
    const lower = code.toLowerCase();

    if (/\btwo\s*sum\b/.test(lower) || /twosum/.test(lower) || /two_sum/.test(lower)) return 'two-sum';
    if (/\breverse\s*(linked\s*)?list\b/.test(lower) || /reverse_list/.test(lower)) return 'reverse-linked-list';
    if (/\bvalid\s*parenthes/.test(lower) || /valid_parenthes/.test(lower)) return 'valid-parentheses';
    if (/\bmerge\s*two\s*(sorted\s*)?list/.test(lower) || /merge_two.*list/.test(lower)) return 'merge-two-sorted-lists';
    if (/\bmax\s*(sub)?array/.test(lower) || /\bkadane/.test(lower) || /max_subarray/.test(lower)) return 'maximum-subarray';
    if (/\bcontains\s*duplicate/.test(lower) || /contains_duplicate/.test(lower)) return 'contains-duplicate';
    if (/\bproduct\s*of\s*array\s*except\s*self/.test(lower)) return 'product-of-array-except-self';
    if (/\bmaximum\s*profit/.test(lower) || /\bbest\s*time\s*to\s*buy/.test(lower) || /max_profit/.test(lower)) return 'best-time-to-buy-and-sell-stock';
    if (/\bclimbing\s*stairs/.test(lower) || /climbing_stairs/.test(lower)) return 'climbing-stairs';
    if (/\binvert\s*(binary\s*)?tree/.test(lower) || /invert.*tree/.test(lower)) return 'invert-binary-tree';
    if (/\banagram/.test(lower) || /valid_anagram/.test(lower)) return 'valid-anagram';
    if (/\bbinary\s*search/.test(lower) || /binary_search/.test(lower)) return 'binary-search';
    if (/\bfirst\s*unique/.test(lower)) return 'first-unique-character';
    if (/\blinked\s*list\s*cycle/.test(lower) || /list_cycle/.test(lower)) return 'linked-list-cycle';
    if (/\bpalindrome\s*(linked\s*list|number|string)?/.test(lower) || /palindrome.*list/.test(lower)) return 'palindrome-linked-list';
    if (/\bfizz\s*buzz/.test(lower) || /fizz_buzz/.test(lower)) return 'fizz-buzz';
    if (/\broman\s*to\s*integer/.test(lower)) return 'roman-to-integer';
    if (/\blongest\s*common\s*prefix/.test(lower)) return 'longest-common-prefix';
    if (/\bvalid\s*palindrome/.test(lower)) return 'valid-palindrome';
    if (/\bmajority\s*element/.test(lower) || /majority_element/.test(lower)) return 'majority-element';
    if (/\bmove\s*zeroes/.test(lower) || /move_zeroes/.test(lower)) return 'move-zeroes';
    if (/\bsingle\s*number/.test(lower) || /single_number/.test(lower)) return 'single-number';
    if (/\bmissing\s*number/.test(lower) || /missing_number/.test(lower)) return 'missing-number';
    if (/\bintersection\s*of\s*two\s*arrays/.test(lower)) return 'intersection-of-two-arrays';
    if (/\bplus\s*one/.test(lower) || /plus_one/.test(lower)) return 'plus-one';
    if (/\blength\s*of\s*last\s*word/.test(lower)) return 'length-of-last-word';
    if (/\badd\s*binary/.test(lower)) return 'add-binary';
    if (/\bsqrt/.test(lower)) return 'sqrtx';
    if (/\bremove\s*duplicate/.test(lower)) return 'remove-duplicates-from-sorted-array';

    return null;
  },
};
