/* ============================================================
   LeetLint — Resources & Solutions Database (Multi-Language)
   ============================================================ */

const ResourceDB = {

  /* ---- Topic-based resources (language-agnostic) ---- */
  topics: {
    'syntax-error': {
      title: 'Syntax Basics',
      resources: [
        { icon: '🎥', title: 'How to Read Syntax Errors', desc: 'Learn to decode compiler/interpreter error messages.', url: 'https://www.youtube.com/results?search_query=how+to+read+syntax+errors+programming' },
        { icon: '📄', title: 'Common Syntax Mistakes', desc: 'Overview of frequent syntax issues across languages.', url: 'https://www.toptal.com/php/10-most-common-mistakes-programmers-make' },
        { icon: '📖', title: 'Debugging Guide', desc: 'General debugging strategies for beginners.', url: 'https://www.freecodecamp.org/news/what-is-debugging-how-to-debug-code/' },
      ],
      solutions: [
        { name: 'Check brackets & parens', complexity: '', desc: 'Ensure all {} [] () are properly matched.' },
        { name: 'Simplify & rebuild', complexity: '', desc: 'Comment out sections and gradually uncomment.' },
      ],
    },
    'assignment-in-condition': {
      title: 'Assignment vs Comparison',
      resources: [
        { icon: '🎥', title: 'Why = vs == Matters', desc: 'Understanding the difference between assignment and comparison.', url: 'https://www.youtube.com/watch?v=6fUc2cZ8Fng' },
        { icon: '📄', title: 'Common Off-by-Equality Bugs', desc: 'How accidental assignments cause bugs.', url: 'https://stackoverflow.com/questions/1512926/why-does-javascript-have-the-operator' },
      ],
      solutions: [
        { name: 'Use == or === (language-appropriate)', complexity: '', desc: 'Double-check you are using comparison, not assignment.' },
        { name: 'Yoda conditions', complexity: '', desc: 'Write constant on left: if (5 == x) — this makes = mistake a syntax error.' },
      ],
    },
    'missing-return': {
      title: 'Missing Return Statements',
      resources: [
        { icon: '🎥', title: 'Return Statements Explained', desc: 'How return works across languages.', url: 'https://www.youtube.com/results?search_query=return+statement+programming+tutorial' },
        { icon: '📄', title: 'Function Return Values', desc: 'Guide to function return types and values.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return' },
      ],
      solutions: [
        { name: 'Add explicit return', complexity: '', desc: 'Ensure every code path has a return statement.' },
        { name: 'Check all branches', complexity: '', desc: 'Verify if/else and switch branches all return a value.' },
      ],
    },
    'infinite-loop': {
      title: 'Infinite Loops',
      resources: [
        { icon: '🎥', title: 'Avoiding Infinite Loops', desc: 'Common causes and debugging techniques.', url: 'https://www.youtube.com/watch?v=YsR7rF1Y1uQ' },
        { icon: '📄', title: 'Loop Design Patterns', desc: 'How to design loops that terminate correctly.', url: 'https://en.wikipedia.org/wiki/Control_flow#Loops' },
      ],
      solutions: [
        { name: 'Verify termination condition', complexity: '', desc: 'Ensure the loop condition will eventually become false.' },
        { name: 'Use a safety counter', complexity: '', desc: 'Add a counter that breaks after a maximum of iterations.' },
      ],
    },
    'debug-statement': {
      title: 'Debugging Statements in Production',
      resources: [
        { icon: '🎥', title: 'Clean Code: Remove Debug Code', desc: 'Best practices for debugging without leaving trace.', url: 'https://www.youtube.com/results?search_query=clean+code+remove+debug+statements' },
        { icon: '📄', title: 'Using a Debugger', desc: 'How to use a proper debugger instead of print statements.', url: 'https://www.freecodecamp.org/news/how-to-debug-code-efficiently/' },
      ],
      solutions: [
        { name: 'Use a debugger', complexity: '', desc: 'Use your IDE/editor debugger to step through code.' },
        { name: 'Remove before commit', complexity: '', desc: 'Remove all print/log statements before final submission.' },
      ],
    },
    'nested-code': {
      title: 'Code Complexity & Refactoring',
      resources: [
        { icon: '🎥', title: 'Clean Code: Reduce Nesting', desc: 'Techniques to flatten deeply nested code.', url: 'https://www.youtube.com/watch?v=WkZ1p3l2e7M' },
        { icon: '📄', title: 'Refactoring Guide', desc: 'Common refactoring patterns.', url: 'https://refactoring.guru/' },
      ],
      solutions: [
        { name: 'Early returns', complexity: '', desc: 'Return early from functions to reduce nesting.' },
        { name: 'Extract helper functions', complexity: '', desc: 'Break complex logic into smaller functions.' },
      ],
    },
  },

  /* ---- Language-specific resources ---- */
  languageTopics: {
    javascript: {
      'avoid-var': {
        title: 'Variable Declarations (JS)',
        resources: [
          { icon: '🎥', title: 'let vs const vs var', desc: 'Differences between JS declaration keywords.', url: 'https://www.youtube.com/watch?v=6UAKBYpUC-I' },
          { icon: '📄', title: 'MDN: let', desc: 'Official MDN docs on let.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let' },
        ],
        solutions: [
          { name: 'Use const by default', complexity: '', desc: 'Use const unless reassignment is needed.' },
          { name: 'Use let for reassignable', complexity: '', desc: 'Only use let when you must reassign the variable.' },
        ],
      },
      'loose-equality': {
        title: 'Type Coercion & Equality (JS)',
        resources: [
          { icon: '🎥', title: 'JS Type Coercion', desc: 'Understanding automatic type conversion.', url: 'https://www.youtube.com/watch?v=ETzUp6nR1KY' },
          { icon: '📄', title: 'MDN: Equality', desc: 'Comparison operators in JavaScript.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness' },
        ],
        solutions: [
          { name: 'Always use ===', complexity: '', desc: 'Use strict equality unless coercion is intentional.' },
          { name: 'Explicit coercion', complexity: '', desc: 'Use Number(), String(), etc. for explicit conversion.' },
        ],
      },
    },
    python: {
      'mutable-default': {
        title: 'Mutable Default Arguments (Python)',
        resources: [
          { icon: '🎥', title: 'Python Mutable Defaults', desc: 'Why mutable default args are dangerous.', url: 'https://www.youtube.com/watch?v=_JGmemuINww' },
          { icon: '📄', title: 'Python Gotchas', desc: 'Common Python pitfalls including mutable defaults.', url: 'https://docs.python-guide.org/writing/gotchas/' },
        ],
        solutions: [
          { name: 'Use None sentinel', complexity: '', desc: 'Use None as default and create a new mutable inside the function.' },
          { name: 'Use immutable defaults', complexity: '', desc: 'Only use immutable values (None, int, str, tuple) as defaults.' },
        ],
      },
      'python-operators': {
        title: 'Python Operators',
        resources: [
          { icon: '🎥', title: 'Python Operators Explained', desc: 'Tutorial on Python-specific operators.', url: 'https://www.youtube.com/watch?v=WJ-I1QkHBNY' },
          { icon: '📄', title: 'Python and/or vs &&/||', desc: 'Why Python uses "and" / "or" instead of && / ||.', url: 'https://docs.python.org/3/reference/expressions.html#boolean-operations' },
        ],
        solutions: [
          { name: 'Use and/or/not', complexity: '', desc: 'Python uses English words for logical operators.' },
          { name: 'Avoid ++ and --', complexity: '', desc: 'Use += 1 or -= 1 instead.' },
        ],
      },
      'type-comparison': {
        title: 'Type Checking in Python',
        resources: [
          { icon: '🎥', title: 'isinstance() vs type()', desc: 'Why isinstance() is preferred.', url: 'https://www.youtube.com/watch?v=jXQsV8Ybfr0' },
          { icon: '📄', title: 'Python isinstance()', desc: 'Official docs on isinstance().', url: 'https://docs.python.org/3/library/functions.html#isinstance' },
        ],
        solutions: [
          { name: 'Use isinstance()', complexity: '', desc: 'isinstance() handles inheritance properly.' },
          { name: 'Avoid type() comparison', complexity: '', desc: 'type() comparison breaks with subclasses.' },
        ],
      },
      'bare-except': {
        title: 'Exception Handling (Python)',
        resources: [
          { icon: '🎥', title: 'Python Exception Handling', desc: 'Best practices for try/except blocks.', url: 'https://www.youtube.com/watch?v=NIWwJbo-9_8' },
          { icon: '📄', title: 'Python Exceptions Docs', desc: 'Official docs on exception handling.', url: 'https://docs.python.org/3/tutorial/errors.html' },
        ],
        solutions: [
          { name: 'Use except Exception', complexity: '', desc: 'Catch specific exceptions instead of bare except.' },
          { name: 'Catch specific types', complexity: '', desc: 'Catch ValueError, TypeError, etc. by name.' },
        ],
      },
    },
    java: {
      'string-compare': {
        title: 'String Comparison in Java',
        resources: [
          { icon: '🎥', title: 'Java String Equality', desc: 'Why == doesn\'t work for strings in Java.', url: 'https://www.youtube.com/watch?v=H3uJ9wL8BFk' },
          { icon: '📄', title: 'Java String Methods', desc: 'Oracle docs on String comparison.', url: 'https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-' },
        ],
        solutions: [
          { name: 'Use .equals()', complexity: '', desc: 'Compare string content with .equals(), not ==.' },
          { name: 'Use .equalsIgnoreCase()', complexity: '', desc: 'For case-insensitive comparison.' },
        ],
      },
      'missing-main': {
        title: 'Java main Method',
        resources: [
          { icon: '🎥', title: 'Java main Method Explained', desc: 'Understanding public static void main.', url: 'https://www.youtube.com/watch?v=1fJ7i2U6LzM' },
          { icon: '📄', title: 'Java main() Docs', desc: 'Oracle on the main method signature.', url: 'https://docs.oracle.com/javase/tutorial/getStarted/application/' },
        ],
        solutions: [
          { name: 'Correct signature', complexity: '', desc: 'public static void main(String[] args)' },
          { name: 'LeetCode convention', complexity: '', desc: 'LeetCode Java uses Solution class with a method — no main needed.' },
        ],
      },
    },
    cpp: {
      'memory-leak': {
        title: 'Memory Management (C++)',
        resources: [
          { icon: '🎥', title: 'C++ Memory Management', desc: 'Understanding new/delete and smart pointers.', url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o' },
          { icon: '📄', title: 'Smart Pointers Guide', desc: 'Use unique_ptr and shared_ptr to avoid leaks.', url: 'https://en.cppreference.com/w/cpp/memory' },
        ],
        solutions: [
          { name: 'Use smart pointers', complexity: '', desc: 'Use std::unique_ptr or std::shared_ptr instead of raw new/delete.' },
          { name: 'Use RAII', complexity: '', desc: 'Resource Acquisition Is Initialization — let destructors handle cleanup.' },
        ],
      },
      'vla': {
        title: 'Variable Length Arrays (C++)',
        resources: [
          { icon: '🎥', title: 'C++ VLA vs std::vector', desc: 'Why VLAs are not standard C++.', url: 'https://www.youtube.com/watch?v=kTr2jAeRr2o' },
          { icon: '📄', title: 'std::vector docs', desc: 'C++ reference on vectors.', url: 'https://en.cppreference.com/w/cpp/container/vector' },
        ],
        solutions: [
          { name: 'Use std::vector', complexity: '', desc: 'std::vector is the standard dynamic array in C++.' },
          { name: 'Use std::array', complexity: '', desc: 'For fixed-size arrays known at compile time.' },
        ],
      },
    },
    c: {
      'buffer-overflow': {
        title: 'Buffer Overflows (C)',
        resources: [
          { icon: '🎥', title: 'Buffer Overflow Explained', desc: 'How buffer overflows happen and how to avoid them.', url: 'https://www.youtube.com/watch?v=1S0aBV-Waeo' },
          { icon: '📄', title: 'Safe C String Handling', desc: 'Guide to safe functions: fgets, strncpy, snprintf.', url: 'https://en.wikipedia.org/wiki/C_string_handling' },
        ],
        solutions: [
          { name: 'Use fgets() instead of gets()', complexity: '', desc: 'fgets() limits input to buffer size.' },
          { name: 'Use strncpy/snprintf', complexity: '', desc: 'Bounds-checked versions of strcpy/sprintf.' },
        ],
      },
      'scanf-mistakes': {
        title: 'scanf() Pitfalls (C)',
        resources: [
          { icon: '🎥', title: 'scanf() Common Mistakes', desc: 'Understanding why & is needed and how format strings work.', url: 'https://www.youtube.com/watch?v=XJ8Mq3M64Gg' },
          { icon: '📄', title: 'scanf() docs', desc: 'C reference for scanf format specifiers.', url: 'https://en.cppreference.com/w/c/io/fscanf' },
        ],
        solutions: [
          { name: 'Use & for variables', complexity: '', desc: 'scanf() needs memory addresses (except for arrays/pointers).' },
          { name: 'Check return value', complexity: '', desc: 'Always check the return value of scanf() for errors.' },
        ],
      },
    },
  },

  /* ---- Problem-specific alternative solutions ---- */
  problemSolutions: {
    'two-sum': [
      { name: 'Brute Force', complexity: 'O(n²)', desc: 'Check every pair using two nested loops.', video: 'https://www.youtube.com/watch?v=UxICm8iTq7s' },
      { name: 'Hash Map (One Pass)', complexity: 'O(n)', desc: 'For each element, check if complement exists in the hash map.', video: 'https://www.youtube.com/watch?v=UxICm8iTq7s' },
      { name: 'Hash Map (Two Pass)', complexity: 'O(n)', desc: 'Build hash map first, then find complement in second pass.', video: 'https://www.youtube.com/watch?v=UxICm8iTq7s' },
    ],
    'reverse-linked-list': [
      { name: 'Iterative', complexity: 'O(n)', desc: 'Use three pointers (prev, curr, next) to reverse links.' },
      { name: 'Recursive', complexity: 'O(n)', desc: 'Recursively reach the tail and reassign pointers on unwind.' },
    ],
    'valid-parentheses': [
      { name: 'Stack', complexity: 'O(n)', desc: 'Push opening brackets, pop and match on closing ones.', video: 'https://www.youtube.com/watch?v=WTzjTskDFMg' },
      { name: 'Replace Pairs', complexity: 'O(n²)', desc: 'Repeatedly replace "()", "{}", "[]" with empty string.' },
    ],
    'merge-two-sorted-lists': [
      { name: 'Iterative with Dummy', complexity: 'O(n+m)', desc: 'Use a dummy head and compare nodes one by one.' },
      { name: 'Recursive', complexity: 'O(n+m)', desc: 'Recursively pick the smaller head and merge the rest.' },
    ],
    'maximum-subarray': [
      { name: "Kadane's Algorithm", complexity: 'O(n)', desc: 'Maintain local/global max sums in a single pass.', video: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg' },
      { name: 'Divide & Conquer', complexity: 'O(n log n)', desc: 'Split array, find max in left/right/crossing subarrays.' },
    ],
    'contains-duplicate': [
      { name: 'Hash Set', complexity: 'O(n)', desc: 'Add elements to a set; if already present, return true.', video: 'https://www.youtube.com/watch?v=3OamzN90kPg' },
      { name: 'Sorting', complexity: 'O(n log n)', desc: 'Sort array and check adjacent elements.' },
    ],
    'product-of-array-except-self': [
      { name: 'Left & Right Pass', complexity: 'O(n)', desc: 'Compute prefix and suffix products in two passes.', video: 'https://www.youtube.com/watch?v=5bS636lE_R0' },
      { name: 'Single Pass with Division', complexity: 'O(n)', desc: 'Total product / each element (zero handling required).' },
    ],
    'best-time-to-buy-and-sell-stock': [
      { name: 'One Pass (Min Price)', complexity: 'O(n)', desc: 'Track min price and max profit as you iterate.', video: 'https://www.youtube.com/watch?v=1pkOgXD63yU' },
      { name: "Kadane's Variant", complexity: 'O(n)', desc: 'Treat daily differences as array, find max subarray.' },
    ],
    'climbing-stairs': [
      { name: 'Dynamic Programming', complexity: 'O(n)', desc: 'dp[i] = dp[i-1] + dp[i-2] (Fibonacci).', video: 'https://www.youtube.com/watch?v=Y0lT34FcWBg' },
      { name: 'Fibonacci Formula', complexity: 'O(1)', desc: "Use Binet's formula for the nth Fibonacci number." },
      { name: 'Recursion with Memo', complexity: 'O(n)', desc: 'Recursive with memoization to avoid recomputation.' },
    ],
    'invert-binary-tree': [
      { name: 'Recursive (DFS)', complexity: 'O(n)', desc: 'Swap left and right children recursively.' },
      { name: 'Iterative (BFS)', complexity: 'O(n)', desc: 'Use a queue to swap nodes level by level.' },
    ],
    'valid-anagram': [
      { name: 'Frequency Counter', complexity: 'O(n)', desc: 'Count char frequencies in one, decrement in the other.', video: 'https://www.youtube.com/watch?v=3OamzN90kPg' },
      { name: 'Sorting', complexity: 'O(n log n)', desc: 'Sort both strings and compare.' },
    ],
    'binary-search': [
      { name: 'Iterative', complexity: 'O(log n)', desc: 'Standard while-loop binary search.' },
      { name: 'Recursive', complexity: 'O(log n)', desc: 'Divide and conquer using recursion.' },
    ],
    'first-unique-character': [
      { name: 'Two Pass (Hash Map)', complexity: 'O(n)', desc: 'Count frequencies, then find first with count 1.' },
      { name: 'One Pass (Index Tracking)', complexity: 'O(n)', desc: 'Track first index; if seen again, mark invalid.' },
    ],
    'linked-list-cycle': [
      { name: "Floyd's (Tortoise & Hare)", complexity: 'O(n)', desc: 'Two pointers at different speeds; they meet if cycle.', video: 'https://www.youtube.com/watch?v=gBTe7lFR3vc' },
      { name: 'Hash Set', complexity: 'O(n)', desc: 'Store visited nodes; check for duplicates.' },
    ],
    'palindrome-linked-list': [
      { name: 'Reverse Second Half', complexity: 'O(n)', desc: 'Find middle, reverse second half, compare.' },
      { name: 'Stack', complexity: 'O(n)', desc: 'Push first half to stack, compare with second.' },
    ],
    'fizz-buzz': [
      { name: 'Simple Conditionals', complexity: 'O(n)', desc: 'Check divisibility by 15, 5, 3 in order.' },
      { name: 'String Concatenation', complexity: 'O(n)', desc: 'Build string by appending "Fizz"/"Buzz".' },
    ],
    'roman-to-integer': [
      { name: 'Left-to-Right', complexity: 'O(n)', desc: 'Add values; if current < next, subtract instead.' },
      { name: 'Right-to-Left', complexity: 'O(n)', desc: 'Traverse right to left, add or subtract.' },
    ],
    'longest-common-prefix': [
      { name: 'Horizontal Scanning', complexity: 'O(n·m)', desc: 'Compare prefix with each string, trimming.' },
      { name: 'Vertical Scanning', complexity: 'O(n·m)', desc: 'Compare chars at same index across all strings.' },
      { name: 'Divide & Conquer', complexity: 'O(n·m)', desc: 'Split array, find LCP of halves, combine.' },
    ],
    'missing-number': [
      { name: 'Sum Formula', complexity: 'O(n)', desc: 'n*(n+1)/2 - sum(array) = missing number.', video: 'https://www.youtube.com/watch?v=WnPLSRLSANE' },
      { name: 'XOR', complexity: 'O(n)', desc: 'XOR all indices and values = missing number.' },
      { name: 'Sorting', complexity: 'O(n log n)', desc: 'Sort and find the gap.' },
    ],
    'move-zeroes': [
      { name: 'Two Pointers', complexity: 'O(n)', desc: 'Move non-zero elements forward, fill rest with zeros.', video: 'https://www.youtube.com/watch?v=1PEncepEIoE' },
      { name: 'Snowball', complexity: 'O(n)', desc: 'Track zero count and swap non-zero with first zero.' },
    ],
    'single-number': [
      { name: 'XOR', complexity: 'O(n)', desc: 'XOR all numbers; duplicates cancel out.', video: 'https://www.youtube.com/watch?v=WnPLSRLSANE' },
      { name: 'Hash Set', complexity: 'O(n)', desc: 'Add/remove from set; last remaining is answer.' },
    ],
  },

  generalApproaches: [
    { name: 'Brute Force', complexity: 'Varies', desc: 'Simplest straightforward solution.' },
    { name: 'Hash Map', complexity: 'O(n) avg', desc: 'Trade space for O(1) lookup time.' },
    { name: 'Two Pointers', complexity: 'O(n)', desc: 'Left/right pointers for array/string traversal.' },
    { name: 'Sliding Window', complexity: 'O(n)', desc: 'Maintain a window for substring/subarray problems.' },
    { name: 'Dynamic Programming', complexity: 'Varies', desc: 'Overlapping subproblems with optimal substructure.' },
    { name: 'BFS / DFS', complexity: 'O(V+E)', desc: 'Graph traversal for tree/graph problems.' },
    { name: 'Binary Search', complexity: 'O(log n)', desc: 'Divide search space in half for sorted data.' },
    { name: 'Greedy', complexity: 'Varies', desc: 'Locally optimal choices at each step.' },
    { name: 'Backtracking', complexity: 'O(2ⁿ)', desc: 'Explore all candidates, backtrack when invalid.' },
  ],

  /* ---- Get resources for an error ---- */
  getResourcesForError(error, language) {
    const title = error.title.toLowerCase();

    // General topics first
    if (title.includes('syntax') || title.includes('unexpected token') || title.includes('unterminated') || title.includes('missing token'))
      return this.topics['syntax-error'];
    if (title.includes('assignment') || title.includes('condition'))
      return this.topics['assignment-in-condition'];
    if (title.includes('return'))
      return this.topics['missing-return'];
    if (title.includes('infinite') || title.includes('loop'))
      return this.topics['infinite-loop'];
    if (title.includes('debug') || title.includes('print') || title.includes('console') || title.includes('printf') || title.includes('cout') || title.includes('system.out'))
      return this.topics['debug-statement'];
    if (title.includes('nesting') || title.includes('depth') || title.includes('complexity'))
      return this.topics['nested-code'];

    // Language-specific
    if (language) {
      const langTopics = this.languageTopics[language];
      if (langTopics) {
        for (const key of Object.keys(langTopics)) {
          const t = langTopics[key];
          if (title.includes(key.replace(/-/g, ' ')) || title.includes(key))
            return t;
        }
        // Check by substrings
        if (language === 'javascript') {
          if (title.includes('var')) return langTopics['avoid-var'];
          if (title.includes('loose') || title.includes('equality') || title.includes('==')) return langTopics['loose-equality'];
        }
        if (language === 'python') {
          if (title.includes('mutable') || title.includes('default')) return langTopics['mutable-default'];
          if (title.includes('operator') || title.includes('++') || title.includes('&&') || title.includes('||')) return langTopics['python-operators'];
          if (title.includes('type') && title.includes('comparison')) return langTopics['type-comparison'];
          if (title.includes('bare') || title.includes('except')) return langTopics['bare-except'];
          if (title.includes('invalid operator') || title.includes('no .length') || title.includes('no .push')) return langTopics['python-operators'];
        }
        if (language === 'java') {
          if (title.includes('string') && title.includes('comparison')) return langTopics['string-compare'];
          if (title.includes('main')) return langTopics['missing-main'];
        }
        if (language === 'cpp') {
          if (title.includes('memory') || title.includes('leak')) return langTopics['memory-leak'];
          if (title.includes('vla')) return langTopics['vla'];
        }
        if (language === 'c') {
          if (title.includes('buffer') || title.includes('unsafe') || title.includes('gets') || title.includes('strcpy')) return langTopics['buffer-overflow'];
          if (title.includes('scanf')) return langTopics['scanf-mistakes'];
        }
      }
    }

    return this.topics['syntax-error'];
  },

  getSolutionsForProblem(problemKey) {
    if (problemKey && this.problemSolutions[problemKey])
      return this.problemSolutions[problemKey];
    return this.generalApproaches.slice(0, 5);
  },
};
