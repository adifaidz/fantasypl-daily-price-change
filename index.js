var request = require('request');
const cheerio = require('cheerio');
var Table = (function () {
  var ansiRegex = (function () {
    const pattern = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
    ].join('|');

    return new RegExp(pattern, 'g');
  })
  var wcwidth

  try {
    wcwidth = (function () {
      "use strict"

      var defaults = (function () {
        var clone = (function () {
          var clone = (function () {
            'use strict';

            /**
             * Clones (copies) an Object using deep copying.
             *
             * This function supports circular references by default, but if you are certain
             * there are no circular references in your object, you can save some CPU time
             * by calling clone(obj, false).
             *
             * Caution: if `circular` is false and `parent` contains circular references,
             * your program may enter an infinite loop and crash.
             *
             * @param `parent` - the object to be cloned
             * @param `circular` - set to true if the object to be cloned may contain
             *    circular references. (optional - true by default)
             * @param `depth` - set to a number if the object is only to be cloned to
             *    a particular depth. (optional - defaults to Infinity)
             * @param `prototype` - sets the prototype to be used when cloning an object.
             *    (optional - defaults to parent prototype).
             */
            function clone(parent, circular, depth, prototype) {
              var filter;
              if (typeof circular === 'object') {
                depth = circular.depth;
                prototype = circular.prototype;
                filter = circular.filter;
                circular = circular.circular
              }
              // maintain two arrays for circular references, where corresponding parents
              // and children have the same index
              var allParents = [];
              var allChildren = [];

              var useBuffer = typeof Buffer != 'undefined';

              if (typeof circular == 'undefined')
                circular = true;

              if (typeof depth == 'undefined')
                depth = Infinity;

              // recurse this function so we don't reset allParents and allChildren
              function _clone(parent, depth) {
                // cloning null always returns null
                if (parent === null)
                  return null;

                if (depth == 0)
                  return parent;

                var child;
                var proto;
                if (typeof parent != 'object') {
                  return parent;
                }

                if (clone.__isArray(parent)) {
                  child = [];
                } else if (clone.__isRegExp(parent)) {
                  child = new RegExp(parent.source, __getRegExpFlags(parent));
                  if (parent.lastIndex) child.lastIndex = parent.lastIndex;
                } else if (clone.__isDate(parent)) {
                  child = new Date(parent.getTime());
                } else if (useBuffer && Buffer.isBuffer(parent)) {
                  if (Buffer.allocUnsafe) {
                    // Node.js >= 4.5.0
                    child = Buffer.allocUnsafe(parent.length);
                  } else {
                    // Older Node.js versions
                    child = new Buffer(parent.length);
                  }
                  parent.copy(child);
                  return child;
                } else {
                  if (typeof prototype == 'undefined') {
                    proto = Object.getPrototypeOf(parent);
                    child = Object.create(proto);
                  } else {
                    child = Object.create(prototype);
                    proto = prototype;
                  }
                }

                if (circular) {
                  var index = allParents.indexOf(parent);

                  if (index != -1) {
                    return allChildren[index];
                  }
                  allParents.push(parent);
                  allChildren.push(child);
                }

                for (var i in parent) {
                  var attrs;
                  if (proto) {
                    attrs = Object.getOwnPropertyDescriptor(proto, i);
                  }

                  if (attrs && attrs.set == null) {
                    continue;
                  }
                  child[i] = _clone(parent[i], depth - 1);
                }

                return child;
              }

              return _clone(parent, depth);
            }

            /**
             * Simple flat clone using prototype, accepts only objects, usefull for property
             * override on FLAT configuration object (no nested props).
             *
             * USE WITH CAUTION! This may not behave as you wish if you do not know how this
             * works.
             */
            clone.clonePrototype = function clonePrototype(parent) {
              if (parent === null)
                return null;

              var c = function () {};
              c.prototype = parent;
              return new c();
            };

            // private utility functions

            function __objToStr(o) {
              return Object.prototype.toString.call(o);
            };
            clone.__objToStr = __objToStr;

            function __isDate(o) {
              return typeof o === 'object' && __objToStr(o) === '[object Date]';
            };
            clone.__isDate = __isDate;

            function __isArray(o) {
              return typeof o === 'object' && __objToStr(o) === '[object Array]';
            };
            clone.__isArray = __isArray;

            function __isRegExp(o) {
              return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
            };
            clone.__isRegExp = __isRegExp;

            function __getRegExpFlags(re) {
              var flags = '';
              if (re.global) flags += 'g';
              if (re.ignoreCase) flags += 'i';
              if (re.multiline) flags += 'm';
              return flags;
            };
            clone.__getRegExpFlags = __getRegExpFlags;

            return clone;
          })();

          if (typeof module === 'object' && module.exports) {
            module.exports = clone;
          }

        });

        return function (options, defaults) {
          options = options || {};

          Object.keys(defaults).forEach(function (key) {
            if (typeof options[key] === 'undefined') {
              options[key] = clone(defaults[key]);
            }
          });

          return options;
        };
      })
      var combining = [
        [0x0300, 0x036F],
        [0x0483, 0x0486],
        [0x0488, 0x0489],
        [0x0591, 0x05BD],
        [0x05BF, 0x05BF],
        [0x05C1, 0x05C2],
        [0x05C4, 0x05C5],
        [0x05C7, 0x05C7],
        [0x0600, 0x0603],
        [0x0610, 0x0615],
        [0x064B, 0x065E],
        [0x0670, 0x0670],
        [0x06D6, 0x06E4],
        [0x06E7, 0x06E8],
        [0x06EA, 0x06ED],
        [0x070F, 0x070F],
        [0x0711, 0x0711],
        [0x0730, 0x074A],
        [0x07A6, 0x07B0],
        [0x07EB, 0x07F3],
        [0x0901, 0x0902],
        [0x093C, 0x093C],
        [0x0941, 0x0948],
        [0x094D, 0x094D],
        [0x0951, 0x0954],
        [0x0962, 0x0963],
        [0x0981, 0x0981],
        [0x09BC, 0x09BC],
        [0x09C1, 0x09C4],
        [0x09CD, 0x09CD],
        [0x09E2, 0x09E3],
        [0x0A01, 0x0A02],
        [0x0A3C, 0x0A3C],
        [0x0A41, 0x0A42],
        [0x0A47, 0x0A48],
        [0x0A4B, 0x0A4D],
        [0x0A70, 0x0A71],
        [0x0A81, 0x0A82],
        [0x0ABC, 0x0ABC],
        [0x0AC1, 0x0AC5],
        [0x0AC7, 0x0AC8],
        [0x0ACD, 0x0ACD],
        [0x0AE2, 0x0AE3],
        [0x0B01, 0x0B01],
        [0x0B3C, 0x0B3C],
        [0x0B3F, 0x0B3F],
        [0x0B41, 0x0B43],
        [0x0B4D, 0x0B4D],
        [0x0B56, 0x0B56],
        [0x0B82, 0x0B82],
        [0x0BC0, 0x0BC0],
        [0x0BCD, 0x0BCD],
        [0x0C3E, 0x0C40],
        [0x0C46, 0x0C48],
        [0x0C4A, 0x0C4D],
        [0x0C55, 0x0C56],
        [0x0CBC, 0x0CBC],
        [0x0CBF, 0x0CBF],
        [0x0CC6, 0x0CC6],
        [0x0CCC, 0x0CCD],
        [0x0CE2, 0x0CE3],
        [0x0D41, 0x0D43],
        [0x0D4D, 0x0D4D],
        [0x0DCA, 0x0DCA],
        [0x0DD2, 0x0DD4],
        [0x0DD6, 0x0DD6],
        [0x0E31, 0x0E31],
        [0x0E34, 0x0E3A],
        [0x0E47, 0x0E4E],
        [0x0EB1, 0x0EB1],
        [0x0EB4, 0x0EB9],
        [0x0EBB, 0x0EBC],
        [0x0EC8, 0x0ECD],
        [0x0F18, 0x0F19],
        [0x0F35, 0x0F35],
        [0x0F37, 0x0F37],
        [0x0F39, 0x0F39],
        [0x0F71, 0x0F7E],
        [0x0F80, 0x0F84],
        [0x0F86, 0x0F87],
        [0x0F90, 0x0F97],
        [0x0F99, 0x0FBC],
        [0x0FC6, 0x0FC6],
        [0x102D, 0x1030],
        [0x1032, 0x1032],
        [0x1036, 0x1037],
        [0x1039, 0x1039],
        [0x1058, 0x1059],
        [0x1160, 0x11FF],
        [0x135F, 0x135F],
        [0x1712, 0x1714],
        [0x1732, 0x1734],
        [0x1752, 0x1753],
        [0x1772, 0x1773],
        [0x17B4, 0x17B5],
        [0x17B7, 0x17BD],
        [0x17C6, 0x17C6],
        [0x17C9, 0x17D3],
        [0x17DD, 0x17DD],
        [0x180B, 0x180D],
        [0x18A9, 0x18A9],
        [0x1920, 0x1922],
        [0x1927, 0x1928],
        [0x1932, 0x1932],
        [0x1939, 0x193B],
        [0x1A17, 0x1A18],
        [0x1B00, 0x1B03],
        [0x1B34, 0x1B34],
        [0x1B36, 0x1B3A],
        [0x1B3C, 0x1B3C],
        [0x1B42, 0x1B42],
        [0x1B6B, 0x1B73],
        [0x1DC0, 0x1DCA],
        [0x1DFE, 0x1DFF],
        [0x200B, 0x200F],
        [0x202A, 0x202E],
        [0x2060, 0x2063],
        [0x206A, 0x206F],
        [0x20D0, 0x20EF],
        [0x302A, 0x302F],
        [0x3099, 0x309A],
        [0xA806, 0xA806],
        [0xA80B, 0xA80B],
        [0xA825, 0xA826],
        [0xFB1E, 0xFB1E],
        [0xFE00, 0xFE0F],
        [0xFE20, 0xFE23],
        [0xFEFF, 0xFEFF],
        [0xFFF9, 0xFFFB],
        [0x10A01, 0x10A03],
        [0x10A05, 0x10A06],
        [0x10A0C, 0x10A0F],
        [0x10A38, 0x10A3A],
        [0x10A3F, 0x10A3F],
        [0x1D167, 0x1D169],
        [0x1D173, 0x1D182],
        [0x1D185, 0x1D18B],
        [0x1D1AA, 0x1D1AD],
        [0x1D242, 0x1D244],
        [0xE0001, 0xE0001],
        [0xE0020, 0xE007F],
        [0xE0100, 0xE01EF]
      ]


      var DEFAULTS = {
        nul: 0,
        control: 0
      }

      module.exports = function wcwidth(str) {
        return wcswidth(str, DEFAULTS)
      }

      module.exports.config = function (opts) {
        opts = defaults(opts || {}, DEFAULTS)
        return function wcwidth(str) {
          return wcswidth(str, opts)
        }
      }

      /*
       *  The following functions define the column width of an ISO 10646
       *  character as follows:
       *  - The null character (U+0000) has a column width of 0.
       *  - Other C0/C1 control characters and DEL will lead to a return value
       *    of -1.
       *  - Non-spacing and enclosing combining characters (general category
       *    code Mn or Me in the
       *    Unicode database) have a column width of 0.
       *  - SOFT HYPHEN (U+00AD) has a column width of 1.
       *  - Other format characters (general category code Cf in the Unicode
       *    database) and ZERO WIDTH
       *    SPACE (U+200B) have a column width of 0.
       *  - Hangul Jamo medial vowels and final consonants (U+1160-U+11FF)
       *    have a column width of 0.
       *  - Spacing characters in the East Asian Wide (W) or East Asian
       *    Full-width (F) category as
       *    defined in Unicode Technical Report #11 have a column width of 2.
       *  - All remaining characters (including all printable ISO 8859-1 and
       *    WGL4 characters, Unicode control characters, etc.) have a column
       *    width of 1.
       *  This implementation assumes that characters are encoded in ISO 10646.
       */

      function wcswidth(str, opts) {
        if (typeof str !== 'string') return wcwidth(str, opts)

        var s = 0
        for (var i = 0; i < str.length; i++) {
          var n = wcwidth(str.charCodeAt(i), opts)
          if (n < 0) return -1
          s += n
        }

        return s
      }

      function wcwidth(ucs, opts) {
        // test for 8-bit control characters
        if (ucs === 0) return opts.nul
        if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0)) return opts.control

        // binary search in table of non-spacing characters
        if (bisearch(ucs)) return 0

        // if we arrive here, ucs is not a combining or C0/C1 control character
        return 1 +
          (ucs >= 0x1100 &&
            (ucs <= 0x115f || // Hangul Jamo init. consonants
              ucs == 0x2329 || ucs == 0x232a ||
              (ucs >= 0x2e80 && ucs <= 0xa4cf &&
                ucs != 0x303f) || // CJK ... Yi
              (ucs >= 0xac00 && ucs <= 0xd7a3) || // Hangul Syllables
              (ucs >= 0xf900 && ucs <= 0xfaff) || // CJK Compatibility Ideographs
              (ucs >= 0xfe10 && ucs <= 0xfe19) || // Vertical forms
              (ucs >= 0xfe30 && ucs <= 0xfe6f) || // CJK Compatibility Forms
              (ucs >= 0xff00 && ucs <= 0xff60) || // Fullwidth Forms
              (ucs >= 0xffe0 && ucs <= 0xffe6) ||
              (ucs >= 0x20000 && ucs <= 0x2fffd) ||
              (ucs >= 0x30000 && ucs <= 0x3fffd)));
      }

      function bisearch(ucs) {
        var min = 0
        var max = combining.length - 1
        var mid

        if (ucs < combining[0][0] || ucs > combining[max][1]) return false

        while (max >= min) {
          mid = Math.floor((min + max) / 2)
          if (ucs > combining[mid][1]) min = mid + 1
          else if (ucs < combining[mid][0]) max = mid - 1
          else return true
        }

        return false
      }

    })()
  } catch (e) {}

  function Table() {
    this.rows = []
    this.row = {
      __printers: {}
    }
  }

  /**
   * Push the current row to the table and start a new one
   *
   * @returns {Table} `this`
   */

  Table.prototype.newRow = function () {
    this.rows.push(this.row)
    this.row = {
      __printers: {}
    }
    return this
  }

  /**
   * Write cell in the current row
   *
   * @param {String} col          - Column name
   * @param {Any} val             - Cell value
   * @param {Function} [printer]  - Printer function to format the value
   * @returns {Table} `this`
   */

  Table.prototype.cell = function (col, val, printer) {
    this.row[col] = val
    this.row.__printers[col] = printer || string
    return this
  }

  /**
   * String to separate columns
   */

  Table.prototype.separator = '  '

  function string(val) {
    return val === undefined ? '' : '' + val
  }

  function length(str) {
    var s = str.replace(ansiRegex(), '')
    return wcwidth == null ? s.length : wcwidth(s)
  }

  /**
   * Default printer
   */

  Table.string = string

  /**
   * Create a printer which right aligns the content by padding with `ch` on the left
   *
   * @param {String} ch
   * @returns {Function}
   */

  Table.leftPadder = leftPadder

  function leftPadder(ch) {
    return function (val, width) {
      var str = string(val)
      var len = length(str)
      var pad = width > len ? Array(width - len + 1).join(ch) : ''
      return pad + str
    }
  }

  /**
   * Printer which right aligns the content
   */

  var padLeft = Table.padLeft = leftPadder(' ')

  /**
   * Create a printer which pads with `ch` on the right
   *
   * @param {String} ch
   * @returns {Function}
   */

  Table.rightPadder = rightPadder

  function rightPadder(ch) {
    return function padRight(val, width) {
      var str = string(val)
      var len = length(str)
      var pad = width > len ? Array(width - len + 1).join(ch) : ''
      return str + pad
    }
  }

  var padRight = rightPadder(' ')

  /**
   * Create a printer for numbers
   *
   * Will do right alignment and optionally fix the number of digits after decimal point
   *
   * @param {Number} [digits] - Number of digits for fixpoint notation
   * @returns {Function}
   */

  Table.number = function (digits) {
    return function (val, width) {
      if (val == null) return ''
      if (typeof val != 'number')
        throw new Error('' + val + ' is not a number')
      var str = digits == null ? val + '' : val.toFixed(digits)
      return padLeft(str, width)
    }
  }

  function each(row, fn) {
    for (var key in row) {
      if (key == '__printers') continue
      fn(key, row[key])
    }
  }

  /**
   * Get list of columns in printing order
   *
   * @returns {string[]}
   */

  Table.prototype.columns = function () {
    var cols = {}
    for (var i = 0; i < 2; i++) { // do 2 times
      this.rows.forEach(function (row) {
        var idx = 0
        each(row, function (key) {
          idx = Math.max(idx, cols[key] || 0)
          cols[key] = idx
          idx++
        })
      })
    }
    return Object.keys(cols).sort(function (a, b) {
      return cols[a] - cols[b]
    })
  }

  /**
   * Format just rows, i.e. print the table without headers and totals
   *
   * @returns {String} String representaion of the table
   */

  Table.prototype.print = function () {
    var cols = this.columns()
    var separator = this.separator
    var widths = {}
    var out = ''

    // Calc widths
    this.rows.forEach(function (row) {
      each(row, function (key, val) {
        var str = row.__printers[key].call(row, val)
        widths[key] = Math.max(length(str), widths[key] || 0)
      })
    })

    // Now print
    this.rows.forEach(function (row) {
      var line = ''
      cols.forEach(function (key) {
        var width = widths[key]
        var str = row.hasOwnProperty(key) ?
          '' + row.__printers[key].call(row, row[key], width) :
          ''
        line += padRight(str, width) + separator
      })
      line = line.slice(0, -separator.length)
      out += line + '\n'
    })

    return out
  }

  /**
   * Format the table
   *
   * @returns {String}
   */

  Table.prototype.toString = function () {
    var cols = this.columns()
    var out = new Table()

    // copy options
    out.separator = this.separator

    // Write header
    cols.forEach(function (col) {
      out.cell(col, col)
    })
    out.newRow()
    out.pushDelimeter(cols)

    // Write body
    out.rows = out.rows.concat(this.rows)

    // Totals
    if (this.totals && this.rows.length) {
      out.pushDelimeter(cols)
      this.forEachTotal(out.cell.bind(out))
      out.newRow()
    }

    return out.print()
  }

  /**
   * Push delimeter row to the table (with each cell filled with dashs during printing)
   *
   * @param {String[]} [cols]
   * @returns {Table} `this`
   */

  Table.prototype.pushDelimeter = function (cols) {
    cols = cols || this.columns()
    cols.forEach(function (col) {
      this.cell(col, undefined, leftPadder('-'))
    }, this)
    return this.newRow()
  }

  /**
   * Compute all totals and yield the results to `cb`
   *
   * @param {Function} cb - Callback function with signature `(column, value, printer)`
   */

  Table.prototype.forEachTotal = function (cb) {
    for (var key in this.totals) {
      var aggr = this.totals[key]
      var acc = aggr.init
      var len = this.rows.length
      this.rows.forEach(function (row, idx) {
        acc = aggr.reduce.call(row, acc, row[key], idx, len)
      })
      cb(key, acc, aggr.printer)
    }
  }

  /**
   * Format the table so that each row represents column and each column represents row
   *
   * @param {Object} [opts]
   * @param {String} [ops.separator] - Column separation string
   * @param {Function} [opts.namePrinter] - Printer to format column names
   * @returns {String}
   */

  Table.prototype.printTransposed = function (opts) {
    opts = opts || {}
    var out = new Table
    out.separator = opts.separator || this.separator
    this.columns().forEach(function (col) {
      out.cell(0, col, opts.namePrinter)
      this.rows.forEach(function (row, idx) {
        out.cell(idx + 1, row[col], row.__printers[col])
      })
      out.newRow()
    }, this)
    return out.print()
  }

  /**
   * Sort the table
   *
   * @param {Function|string[]} [cmp] - Either compare function or a list of columns to sort on
   * @returns {Table} `this`
   */

  Table.prototype.sort = function (cmp) {
    if (typeof cmp == 'function') {
      this.rows.sort(cmp)
      return this
    }

    var keys = Array.isArray(cmp) ? cmp : this.columns()

    var comparators = keys.map(function (key) {
      var order = 'asc'
      var m = /(.*)\|\s*(asc|des)\s*$/.exec(key)
      if (m) {
        key = m[1]
        order = m[2]
      }
      return function (a, b) {
        return order == 'asc' ?
          compare(a[key], b[key]) :
          compare(b[key], a[key])
      }
    })

    return this.sort(function (a, b) {
      for (var i = 0; i < comparators.length; i++) {
        var order = comparators[i](a, b)
        if (order != 0) return order
      }
      return 0
    })
  }

  function compare(a, b) {
    if (a === b) return 0
    if (a === undefined) return 1
    if (b === undefined) return -1
    if (a === null) return 1
    if (b === null) return -1
    if (a > b) return 1
    if (a < b) return -1
    return compare(String(a), String(b))
  }

  /**
   * Add a total for the column
   *
   * @param {String} col - column name
   * @param {Object} [opts]
   * @param {Function} [opts.reduce = sum] - reduce(acc, val, idx, length) function to compute the total value
   * @param {Function} [opts.printer = padLeft] - Printer to format the total cell
   * @param {Any} [opts.init = 0] - Initial value for reduction
   * @returns {Table} `this`
   */

  Table.prototype.total = function (col, opts) {
    opts = opts || {}
    this.totals = this.totals || {}
    this.totals[col] = {
      reduce: opts.reduce || Table.aggr.sum,
      printer: opts.printer || padLeft,
      init: opts.init == null ? 0 : opts.init
    }
    return this
  }

  /**
   * Predefined helpers for totals
   */

  Table.aggr = {}

  /**
   * Create a printer which formats the value with `printer`,
   * adds the `prefix` to it and right aligns the whole thing
   *
   * @param {String} prefix
   * @param {Function} printer
   * @returns {printer}
   */

  Table.aggr.printer = function (prefix, printer) {
    printer = printer || string
    return function (val, width) {
      return padLeft(prefix + printer(val), width)
    }
  }

  /**
   * Sum reduction
   */

  Table.aggr.sum = function (acc, val) {
    return acc + val
  }

  /**
   * Average reduction
   */

  Table.aggr.avg = function (acc, val, idx, len) {
    acc = acc + val
    return idx + 1 == len ? acc / len : acc
  }

  /**
   * Print the array or object
   *
   * @param {Array|Object} obj - Object to print
   * @param {Function|Object} [format] - Format options
   * @param {Function} [cb] - Table post processing and formating
   * @returns {String}
   */

  Table.print = function (obj, format, cb) {
    var opts = format || {}

    format = typeof format == 'function' ?
      format :
      function (obj, cell) {
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) continue
          var params = opts[key] || {}
          cell(params.name || key, obj[key], params.printer)
        }
      }

    var t = new Table
    var cell = t.cell.bind(t)

    if (Array.isArray(obj)) {
      cb = cb || function (t) {
        return t.toString()
      }
      obj.forEach(function (item) {
        format(item, cell)
        t.newRow()
      })
    } else {
      cb = cb || function (t) {
        return t.printTransposed({
          separator: ' : '
        })
      }
      format(obj, cell)
      t.newRow()
    }

    return cb(t)
  }

  /**
   * Same as `Table.print()` but yields the result to `console.log()`
   */

  Table.log = function (obj, format, cb) {
    console.log(Table.print(obj, format, cb))
  }

  /**
   * Same as `.toString()` but yields the result to `console.log()`
   */

  Table.prototype.log = function () {
    console.log(this.toString())
  }

  return Table;
})();

module['exports'] = function priceChangeUpdate(hook) {
  console.log(hook.params);
  var $ = cheerio.load(hook.params.text);
  var output = '```md\n';

  $('h3').each(function (i, header) {
    var rows = $($('table>tbody')[i]).find('tr');
    var sign = i % 2 === 0 ? ' ⬆ ' : ' ⬇ ';

    output += '# ' + $(header).text() + ' #:\n\n';
    var table = new Table;
    rows.each(function (i, row) {
      var cells = $(row).find('td');
      table.cell('Name', $(cells[0]).text());
      table.cell('Team', $(cells[1]).text());
      table.cell('Position', $(cells[2]).text());
      table.cell('Ownership', $(cells[3]).text());
      table.cell('Old Price', $(cells[4]).text());
      table.cell('New Price', $(cells[5]).text());
      table.cell('Diff', $(cells[6]).text());
      table.newRow();
    });
    output += table.toString() + '\n\n';
  });

  output += '```';

  var content = {
    "username": "FPL Updates",
    "avatar_url": "https://fantasy.premierleague.com/static/libsass/plfpl/dist/img/facebook-share.png",
    "content": output,
    "embeds": [{
      "title": hook.params.title,
      "url": hook.params.url,
      "color": 65415,
      "footer": {
        "text": "automated from /r/FantasyPL",
        "icon_url": "https://fantasy.premierleague.com/static/libsass/plfpl/dist/img/facebook-share.png"
      }
    }]
  };

  console.log(content);
  // hook.res.end(hook.env);
  return request.post({
    url: 'https://discordapp.com/api/webhooks/' + hook.env.discord_webhook_id,
    body: content,
    json: true
  }, function (err, res, body) {
    if (err) {
      console.log("Error : " + err.message);
      return hook.res.end(err.messsage);
    }
    console.log("Success");
    hook.res.end(body);
  });
};