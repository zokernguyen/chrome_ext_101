/*! For license information please see authContentScript.js.LICENSE.txt */
(() => {
  var e = {
    9742: (e, t) => {
      "use strict";
      (t.byteLength = function (e) {
        var t = u(e),
          n = t[0],
          r = t[1];
        return (3 * (n + r)) / 4 - r;
      }),
        (t.toByteArray = function (e) {
          var t,
            n,
            s = u(e),
            o = s[0],
            a = s[1],
            c = new i(
              (function (e, t, n) {
                return (3 * (t + n)) / 4 - n;
              })(0, o, a)
            ),
            h = 0,
            f = a > 0 ? o - 4 : o;
          for (n = 0; n < f; n += 4)
            (t = (r[e.charCodeAt(n)] << 18) | (r[e.charCodeAt(n + 1)] << 12) | (r[e.charCodeAt(n + 2)] << 6) | r[e.charCodeAt(n + 3)]), (c[h++] = (t >> 16) & 255), (c[h++] = (t >> 8) & 255), (c[h++] = 255 & t);
          return (
            2 === a && ((t = (r[e.charCodeAt(n)] << 2) | (r[e.charCodeAt(n + 1)] >> 4)), (c[h++] = 255 & t)),
            1 === a && ((t = (r[e.charCodeAt(n)] << 10) | (r[e.charCodeAt(n + 1)] << 4) | (r[e.charCodeAt(n + 2)] >> 2)), (c[h++] = (t >> 8) & 255), (c[h++] = 255 & t)),
            c
          );
        }),
        (t.fromByteArray = function (e) {
          for (var t, r = e.length, i = r % 3, s = [], o = 16383, a = 0, u = r - i; a < u; a += o) s.push(c(e, a, a + o > u ? u : a + o));
          return 1 === i ? ((t = e[r - 1]), s.push(n[t >> 2] + n[(t << 4) & 63] + "==")) : 2 === i && ((t = (e[r - 2] << 8) + e[r - 1]), s.push(n[t >> 10] + n[(t >> 4) & 63] + n[(t << 2) & 63] + "=")), s.join("");
        });
      for (var n = [], r = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, a = s.length; o < a; ++o)
        (n[o] = s[o]), (r[s.charCodeAt(o)] = o);
      function u(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var n = e.indexOf("=");
        return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
      }
      function c(e, t, r) {
        for (var i, s, o = [], a = t; a < r; a += 3) (i = ((e[a] << 16) & 16711680) + ((e[a + 1] << 8) & 65280) + (255 & e[a + 2])), o.push(n[((s = i) >> 18) & 63] + n[(s >> 12) & 63] + n[(s >> 6) & 63] + n[63 & s]);
        return o.join("");
      }
      (r["-".charCodeAt(0)] = 62), (r["_".charCodeAt(0)] = 63);
    },
    8764: (e, t, n) => {
      "use strict";
      var r = n(9742),
        i = n(645),
        s = n(5826);
      function o() {
        return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(e, t) {
        if (o() < t) throw new RangeError("Invalid typed array length");
        return u.TYPED_ARRAY_SUPPORT ? ((e = new Uint8Array(t)).__proto__ = u.prototype) : (null === e && (e = new u(t)), (e.length = t)), e;
      }
      function u(e, t, n) {
        if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(e, t, n);
        if ("number" == typeof e) {
          if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
          return f(this, e);
        }
        return c(this, e, t, n);
      }
      function c(e, t, n, r) {
        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
          ? (function (e, t, n, r) {
            if ((t.byteLength, n < 0 || t.byteLength < n)) throw new RangeError("'offset' is out of bounds");
            if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
            return (t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r)), u.TYPED_ARRAY_SUPPORT ? ((e = t).__proto__ = u.prototype) : (e = l(e, t)), e;
          })(e, t, n, r)
          : "string" == typeof t
            ? (function (e, t, n) {
              if ((("string" == typeof n && "" !== n) || (n = "utf8"), !u.isEncoding(n))) throw new TypeError('"encoding" must be a valid string encoding');
              var r = 0 | d(t, n),
                i = (e = a(e, r)).write(t, n);
              return i !== r && (e = e.slice(0, i)), e;
            })(e, t, n)
            : (function (e, t) {
              if (u.isBuffer(t)) {
                var n = 0 | g(t.length);
                return 0 === (e = a(e, n)).length || t.copy(e, 0, 0, n), e;
              }
              if (t) {
                if (("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer) || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? a(e, 0) : l(e, t);
                if ("Buffer" === t.type && s(t.data)) return l(e, t.data);
              }
              var r;
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            })(e, t);
      }
      function h(e) {
        if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
        if (e < 0) throw new RangeError('"size" argument must not be negative');
      }
      function f(e, t) {
        if ((h(t), (e = a(e, t < 0 ? 0 : 0 | g(t))), !u.TYPED_ARRAY_SUPPORT)) for (var n = 0; n < t; ++n) e[n] = 0;
        return e;
      }
      function l(e, t) {
        var n = t.length < 0 ? 0 : 0 | g(t.length);
        e = a(e, n);
        for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
        return e;
      }
      function g(e) {
        if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
        return 0 | e;
      }
      function d(e, t) {
        if (u.isBuffer(e)) return e.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
        "string" != typeof e && (e = "" + e);
        var n = e.length;
        if (0 === n) return 0;
        for (var r = !1; ;)
          switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
              return n;
            case "utf8":
            case "utf-8":
            case void 0:
              return K(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;
            case "hex":
              return n >>> 1;
            case "base64":
              return q(e).length;
            default:
              if (r) return K(e).length;
              (t = ("" + t).toLowerCase()), (r = !0);
          }
      }
      function p(e, t, n) {
        var r = !1;
        if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
        if (((void 0 === n || n > this.length) && (n = this.length), n <= 0)) return "";
        if ((n >>>= 0) <= (t >>>= 0)) return "";
        for (e || (e = "utf8"); ;)
          switch (e) {
            case "hex":
              return P(this, t, n);
            case "utf8":
            case "utf-8":
              return D(this, t, n);
            case "ascii":
              return R(this, t, n);
            case "latin1":
            case "binary":
              return b(this, t, n);
            case "base64":
              return E(this, t, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return k(this, t, n);
            default:
              if (r) throw new TypeError("Unknown encoding: " + e);
              (e = (e + "").toLowerCase()), (r = !0);
          }
      }
      function v(e, t, n) {
        var r = e[t];
        (e[t] = e[n]), (e[n] = r);
      }
      function y(e, t, n, r, i) {
        if (0 === e.length) return -1;
        if (("string" == typeof n ? ((r = n), (n = 0)) : n > 2147483647 ? (n = 2147483647) : n < -2147483648 && (n = -2147483648), (n = +n), isNaN(n) && (n = i ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length)) {
          if (i) return -1;
          n = e.length - 1;
        } else if (n < 0) {
          if (!i) return -1;
          n = 0;
        }
        if (("string" == typeof t && (t = u.from(t, r)), u.isBuffer(t))) return 0 === t.length ? -1 : m(e, t, n, r, i);
        if ("number" == typeof t)
          return (t &= 255), u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? (i ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n)) : m(e, [t], n, r, i);
        throw new TypeError("val must be string, number or Buffer");
      }
      function m(e, t, n, r, i) {
        var s,
          o = 1,
          a = e.length,
          u = t.length;
        if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
          if (e.length < 2 || t.length < 2) return -1;
          (o = 2), (a /= 2), (u /= 2), (n /= 2);
        }
        function c(e, t) {
          return 1 === o ? e[t] : e.readUInt16BE(t * o);
        }
        if (i) {
          var h = -1;
          for (s = n; s < a; s++)
            if (c(e, s) === c(t, -1 === h ? 0 : s - h)) {
              if ((-1 === h && (h = s), s - h + 1 === u)) return h * o;
            } else -1 !== h && (s -= s - h), (h = -1);
        } else
          for (n + u > a && (n = a - u), s = n; s >= 0; s--) {
            for (var f = !0, l = 0; l < u; l++)
              if (c(e, s + l) !== c(t, l)) {
                f = !1;
                break;
              }
            if (f) return s;
          }
        return -1;
      }
      function S(e, t, n, r) {
        n = Number(n) || 0;
        var i = e.length - n;
        r ? (r = Number(r)) > i && (r = i) : (r = i);
        var s = t.length;
        if (s % 2 != 0) throw new TypeError("Invalid hex string");
        r > s / 2 && (r = s / 2);
        for (var o = 0; o < r; ++o) {
          var a = parseInt(t.substr(2 * o, 2), 16);
          if (isNaN(a)) return o;
          e[n + o] = a;
        }
        return o;
      }
      function w(e, t, n, r) {
        return L(K(t, e.length - n), e, n, r);
      }
      function A(e, t, n, r) {
        return L(
          (function (e) {
            for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
            return t;
          })(t),
          e,
          n,
          r
        );
      }
      function C(e, t, n, r) {
        return A(e, t, n, r);
      }
      function U(e, t, n, r) {
        return L(q(t), e, n, r);
      }
      function T(e, t, n, r) {
        return L(
          (function (e, t) {
            for (var n, r, i, s = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) (r = (n = e.charCodeAt(o)) >> 8), (i = n % 256), s.push(i), s.push(r);
            return s;
          })(t, e.length - n),
          e,
          n,
          r
        );
      }
      function E(e, t, n) {
        return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n));
      }
      function D(e, t, n) {
        n = Math.min(e.length, n);
        for (var r = [], i = t; i < n;) {
          var s,
            o,
            a,
            u,
            c = e[i],
            h = null,
            f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (i + f <= n)
            switch (f) {
              case 1:
                c < 128 && (h = c);
                break;
              case 2:
                128 == (192 & (s = e[i + 1])) && (u = ((31 & c) << 6) | (63 & s)) > 127 && (h = u);
                break;
              case 3:
                (s = e[i + 1]), (o = e[i + 2]), 128 == (192 & s) && 128 == (192 & o) && (u = ((15 & c) << 12) | ((63 & s) << 6) | (63 & o)) > 2047 && (u < 55296 || u > 57343) && (h = u);
                break;
              case 4:
                (s = e[i + 1]),
                  (o = e[i + 2]),
                  (a = e[i + 3]),
                  128 == (192 & s) && 128 == (192 & o) && 128 == (192 & a) && (u = ((15 & c) << 18) | ((63 & s) << 12) | ((63 & o) << 6) | (63 & a)) > 65535 && u < 1114112 && (h = u);
            }
          null === h ? ((h = 65533), (f = 1)) : h > 65535 && ((h -= 65536), r.push(((h >>> 10) & 1023) | 55296), (h = 56320 | (1023 & h))), r.push(h), (i += f);
        }
        return (function (e) {
          var t = e.length;
          if (t <= I) return String.fromCharCode.apply(String, e);
          for (var n = "", r = 0; r < t;) n += String.fromCharCode.apply(String, e.slice(r, (r += I)));
          return n;
        })(r);
      }
      (t.Buffer = u),
        (t.INSPECT_MAX_BYTES = 50),
        (u.TYPED_ARRAY_SUPPORT =
          void 0 !== n.g.TYPED_ARRAY_SUPPORT
            ? n.g.TYPED_ARRAY_SUPPORT
            : (function () {
              try {
                var e = new Uint8Array(1);
                return (
                  (e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                      return 42;
                    },
                  }),
                  42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                );
              } catch (e) {
                return !1;
              }
            })()),
        o(),
        (u.poolSize = 8192),
        (u._augment = function (e) {
          return (e.__proto__ = u.prototype), e;
        }),
        (u.from = function (e, t, n) {
          return c(null, e, t, n);
        }),
        u.TYPED_ARRAY_SUPPORT &&
        ((u.prototype.__proto__ = Uint8Array.prototype),
          (u.__proto__ = Uint8Array),
          "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, { value: null, configurable: !0 })),
        (u.alloc = function (e, t, n) {
          return (function (e, t, n, r) {
            return h(t), t <= 0 ? a(e, t) : void 0 !== n ? ("string" == typeof r ? a(e, t).fill(n, r) : a(e, t).fill(n)) : a(e, t);
          })(null, e, t, n);
        }),
        (u.allocUnsafe = function (e) {
          return f(null, e);
        }),
        (u.allocUnsafeSlow = function (e) {
          return f(null, e);
        }),
        (u.isBuffer = function (e) {
          return !(null == e || !e._isBuffer);
        }),
        (u.compare = function (e, t) {
          if (!u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
          if (e === t) return 0;
          for (var n = e.length, r = t.length, i = 0, s = Math.min(n, r); i < s; ++i)
            if (e[i] !== t[i]) {
              (n = e[i]), (r = t[i]);
              break;
            }
          return n < r ? -1 : r < n ? 1 : 0;
        }),
        (u.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (u.concat = function (e, t) {
          if (!s(e)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return u.alloc(0);
          var n;
          if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
          var r = u.allocUnsafe(t),
            i = 0;
          for (n = 0; n < e.length; ++n) {
            var o = e[n];
            if (!u.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
            o.copy(r, i), (i += o.length);
          }
          return r;
        }),
        (u.byteLength = d),
        (u.prototype._isBuffer = !0),
        (u.prototype.swap16 = function () {
          var e = this.length;
          if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var t = 0; t < e; t += 2) v(this, t, t + 1);
          return this;
        }),
        (u.prototype.swap32 = function () {
          var e = this.length;
          if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var t = 0; t < e; t += 4) v(this, t, t + 3), v(this, t + 1, t + 2);
          return this;
        }),
        (u.prototype.swap64 = function () {
          var e = this.length;
          if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var t = 0; t < e; t += 8) v(this, t, t + 7), v(this, t + 1, t + 6), v(this, t + 2, t + 5), v(this, t + 3, t + 4);
          return this;
        }),
        (u.prototype.toString = function () {
          var e = 0 | this.length;
          return 0 === e ? "" : 0 === arguments.length ? D(this, 0, e) : p.apply(this, arguments);
        }),
        (u.prototype.equals = function (e) {
          if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          return this === e || 0 === u.compare(this, e);
        }),
        (u.prototype.inspect = function () {
          var e = "",
            n = t.INSPECT_MAX_BYTES;
          return this.length > 0 && ((e = this.toString("hex", 0, n).match(/.{2}/g).join(" ")), this.length > n && (e += " ... ")), "<Buffer " + e + ">";
        }),
        (u.prototype.compare = function (e, t, n, r, i) {
          if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          if ((void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), t < 0 || n > e.length || r < 0 || i > this.length))
            throw new RangeError("out of range index");
          if (r >= i && t >= n) return 0;
          if (r >= i) return -1;
          if (t >= n) return 1;
          if (this === e) return 0;
          for (var s = (i >>>= 0) - (r >>>= 0), o = (n >>>= 0) - (t >>>= 0), a = Math.min(s, o), c = this.slice(r, i), h = e.slice(t, n), f = 0; f < a; ++f)
            if (c[f] !== h[f]) {
              (s = c[f]), (o = h[f]);
              break;
            }
          return s < o ? -1 : o < s ? 1 : 0;
        }),
        (u.prototype.includes = function (e, t, n) {
          return -1 !== this.indexOf(e, t, n);
        }),
        (u.prototype.indexOf = function (e, t, n) {
          return y(this, e, t, n, !0);
        }),
        (u.prototype.lastIndexOf = function (e, t, n) {
          return y(this, e, t, n, !1);
        }),
        (u.prototype.write = function (e, t, n, r) {
          if (void 0 === t) (r = "utf8"), (n = this.length), (t = 0);
          else if (void 0 === n && "string" == typeof t) (r = t), (n = this.length), (t = 0);
          else {
            if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            (t |= 0), isFinite(n) ? ((n |= 0), void 0 === r && (r = "utf8")) : ((r = n), (n = void 0));
          }
          var i = this.length - t;
          if (((void 0 === n || n > i) && (n = i), (e.length > 0 && (n < 0 || t < 0)) || t > this.length)) throw new RangeError("Attempt to write outside buffer bounds");
          r || (r = "utf8");
          for (var s = !1; ;)
            switch (r) {
              case "hex":
                return S(this, e, t, n);
              case "utf8":
              case "utf-8":
                return w(this, e, t, n);
              case "ascii":
                return A(this, e, t, n);
              case "latin1":
              case "binary":
                return C(this, e, t, n);
              case "base64":
                return U(this, e, t, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return T(this, e, t, n);
              default:
                if (s) throw new TypeError("Unknown encoding: " + r);
                (r = ("" + r).toLowerCase()), (s = !0);
            }
        }),
        (u.prototype.toJSON = function () {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        });
      var I = 4096;
      function R(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
        return r;
      }
      function b(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
        return r;
      }
      function P(e, t, n) {
        var r,
          i = e.length;
        (!t || t < 0) && (t = 0), (!n || n < 0 || n > i) && (n = i);
        for (var s = "", o = t; o < n; ++o) s += (r = e[o]) < 16 ? "0" + r.toString(16) : r.toString(16);
        return s;
      }
      function k(e, t, n) {
        for (var r = e.slice(t, n), i = "", s = 0; s < r.length; s += 2) i += String.fromCharCode(r[s] + 256 * r[s + 1]);
        return i;
      }
      function _(e, t, n) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
      }
      function B(e, t, n, r, i, s) {
        if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < s) throw new RangeError('"value" argument is out of bounds');
        if (n + r > e.length) throw new RangeError("Index out of range");
      }
      function F(e, t, n, r) {
        t < 0 && (t = 65535 + t + 1);
        for (var i = 0, s = Math.min(e.length - n, 2); i < s; ++i) e[n + i] = (t & (255 << (8 * (r ? i : 1 - i)))) >>> (8 * (r ? i : 1 - i));
      }
      function M(e, t, n, r) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var i = 0, s = Math.min(e.length - n, 4); i < s; ++i) e[n + i] = (t >>> (8 * (r ? i : 3 - i))) & 255;
      }
      function x(e, t, n, r, i, s) {
        if (n + r > e.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }
      function O(e, t, n, r, s) {
        return s || x(e, 0, n, 4), i.write(e, t, n, r, 23, 4), n + 4;
      }
      function N(e, t, n, r, s) {
        return s || x(e, 0, n, 8), i.write(e, t, n, r, 52, 8), n + 8;
      }
      (u.prototype.slice = function (e, t) {
        var n,
          r = this.length;
        if (((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), u.TYPED_ARRAY_SUPPORT))
          (n = this.subarray(e, t)).__proto__ = u.prototype;
        else {
          var i = t - e;
          n = new u(i, void 0);
          for (var s = 0; s < i; ++s) n[s] = this[s + e];
        }
        return n;
      }),
        (u.prototype.readUIntLE = function (e, t, n) {
          (e |= 0), (t |= 0), n || _(e, t, this.length);
          for (var r = this[e], i = 1, s = 0; ++s < t && (i *= 256);) r += this[e + s] * i;
          return r;
        }),
        (u.prototype.readUIntBE = function (e, t, n) {
          (e |= 0), (t |= 0), n || _(e, t, this.length);
          for (var r = this[e + --t], i = 1; t > 0 && (i *= 256);) r += this[e + --t] * i;
          return r;
        }),
        (u.prototype.readUInt8 = function (e, t) {
          return t || _(e, 1, this.length), this[e];
        }),
        (u.prototype.readUInt16LE = function (e, t) {
          return t || _(e, 2, this.length), this[e] | (this[e + 1] << 8);
        }),
        (u.prototype.readUInt16BE = function (e, t) {
          return t || _(e, 2, this.length), (this[e] << 8) | this[e + 1];
        }),
        (u.prototype.readUInt32LE = function (e, t) {
          return t || _(e, 4, this.length), (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + 16777216 * this[e + 3];
        }),
        (u.prototype.readUInt32BE = function (e, t) {
          return t || _(e, 4, this.length), 16777216 * this[e] + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]);
        }),
        (u.prototype.readIntLE = function (e, t, n) {
          (e |= 0), (t |= 0), n || _(e, t, this.length);
          for (var r = this[e], i = 1, s = 0; ++s < t && (i *= 256);) r += this[e + s] * i;
          return r >= (i *= 128) && (r -= Math.pow(2, 8 * t)), r;
        }),
        (u.prototype.readIntBE = function (e, t, n) {
          (e |= 0), (t |= 0), n || _(e, t, this.length);
          for (var r = t, i = 1, s = this[e + --r]; r > 0 && (i *= 256);) s += this[e + --r] * i;
          return s >= (i *= 128) && (s -= Math.pow(2, 8 * t)), s;
        }),
        (u.prototype.readInt8 = function (e, t) {
          return t || _(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
        }),
        (u.prototype.readInt16LE = function (e, t) {
          t || _(e, 2, this.length);
          var n = this[e] | (this[e + 1] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (u.prototype.readInt16BE = function (e, t) {
          t || _(e, 2, this.length);
          var n = this[e + 1] | (this[e] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (u.prototype.readInt32LE = function (e, t) {
          return t || _(e, 4, this.length), this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24);
        }),
        (u.prototype.readInt32BE = function (e, t) {
          return t || _(e, 4, this.length), (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3];
        }),
        (u.prototype.readFloatLE = function (e, t) {
          return t || _(e, 4, this.length), i.read(this, e, !0, 23, 4);
        }),
        (u.prototype.readFloatBE = function (e, t) {
          return t || _(e, 4, this.length), i.read(this, e, !1, 23, 4);
        }),
        (u.prototype.readDoubleLE = function (e, t) {
          return t || _(e, 8, this.length), i.read(this, e, !0, 52, 8);
        }),
        (u.prototype.readDoubleBE = function (e, t) {
          return t || _(e, 8, this.length), i.read(this, e, !1, 52, 8);
        }),
        (u.prototype.writeUIntLE = function (e, t, n, r) {
          (e = +e), (t |= 0), (n |= 0), r || B(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
          var i = 1,
            s = 0;
          for (this[t] = 255 & e; ++s < n && (i *= 256);) this[t + s] = (e / i) & 255;
          return t + n;
        }),
        (u.prototype.writeUIntBE = function (e, t, n, r) {
          (e = +e), (t |= 0), (n |= 0), r || B(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
          var i = n - 1,
            s = 1;
          for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) this[t + i] = (e / s) & 255;
          return t + n;
        }),
        (u.prototype.writeUInt8 = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), (this[t] = 255 & e), t + 1;
        }),
        (u.prototype.writeUInt16LE = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8)) : F(this, e, t, !0), t + 2;
        }),
        (u.prototype.writeUInt16BE = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e)) : F(this, e, t, !1), t + 2;
        }),
        (u.prototype.writeUInt32LE = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? ((this[t + 3] = e >>> 24), (this[t + 2] = e >>> 16), (this[t + 1] = e >>> 8), (this[t] = 255 & e)) : M(this, e, t, !0), t + 4;
        }),
        (u.prototype.writeUInt32BE = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 24), (this[t + 1] = e >>> 16), (this[t + 2] = e >>> 8), (this[t + 3] = 255 & e)) : M(this, e, t, !1), t + 4;
        }),
        (u.prototype.writeIntLE = function (e, t, n, r) {
          if (((e = +e), (t |= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            B(this, e, t, n, i - 1, -i);
          }
          var s = 0,
            o = 1,
            a = 0;
          for (this[t] = 255 & e; ++s < n && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + s - 1] && (a = 1), (this[t + s] = (((e / o) >> 0) - a) & 255);
          return t + n;
        }),
        (u.prototype.writeIntBE = function (e, t, n, r) {
          if (((e = +e), (t |= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            B(this, e, t, n, i - 1, -i);
          }
          var s = n - 1,
            o = 1,
            a = 0;
          for (this[t + s] = 255 & e; --s >= 0 && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + s + 1] && (a = 1), (this[t + s] = (((e / o) >> 0) - a) & 255);
          return t + n;
        }),
        (u.prototype.writeInt8 = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), (this[t] = 255 & e), t + 1;
        }),
        (u.prototype.writeInt16LE = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8)) : F(this, e, t, !0), t + 2;
        }),
        (u.prototype.writeInt16BE = function (e, t, n) {
          return (e = +e), (t |= 0), n || B(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e)) : F(this, e, t, !1), t + 2;
        }),
        (u.prototype.writeInt32LE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || B(this, e, t, 4, 2147483647, -2147483648),
            u.TYPED_ARRAY_SUPPORT ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8), (this[t + 2] = e >>> 16), (this[t + 3] = e >>> 24)) : M(this, e, t, !0),
            t + 4
          );
        }),
        (u.prototype.writeInt32BE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || B(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            u.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 24), (this[t + 1] = e >>> 16), (this[t + 2] = e >>> 8), (this[t + 3] = 255 & e)) : M(this, e, t, !1),
            t + 4
          );
        }),
        (u.prototype.writeFloatLE = function (e, t, n) {
          return O(this, e, t, !0, n);
        }),
        (u.prototype.writeFloatBE = function (e, t, n) {
          return O(this, e, t, !1, n);
        }),
        (u.prototype.writeDoubleLE = function (e, t, n) {
          return N(this, e, t, !0, n);
        }),
        (u.prototype.writeDoubleBE = function (e, t, n) {
          return N(this, e, t, !1, n);
        }),
        (u.prototype.copy = function (e, t, n, r) {
          if ((n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n)) return 0;
          if (0 === e.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError("targetStart out of bounds");
          if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
          if (r < 0) throw new RangeError("sourceEnd out of bounds");
          r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
          var i,
            s = r - n;
          if (this === e && n < t && t < r) for (i = s - 1; i >= 0; --i) e[i + t] = this[i + n];
          else if (s < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (i = 0; i < s; ++i) e[i + t] = this[i + n];
          else Uint8Array.prototype.set.call(e, this.subarray(n, n + s), t);
          return s;
        }),
        (u.prototype.fill = function (e, t, n, r) {
          if ("string" == typeof e) {
            if (("string" == typeof t ? ((r = t), (t = 0), (n = this.length)) : "string" == typeof n && ((r = n), (n = this.length)), 1 === e.length)) {
              var i = e.charCodeAt(0);
              i < 256 && (e = i);
            }
            if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
            if ("string" == typeof r && !u.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
          } else "number" == typeof e && (e &= 255);
          if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
          if (n <= t) return this;
          var s;
          if (((t >>>= 0), (n = void 0 === n ? this.length : n >>> 0), e || (e = 0), "number" == typeof e)) for (s = t; s < n; ++s) this[s] = e;
          else {
            var o = u.isBuffer(e) ? e : K(new u(e, r).toString()),
              a = o.length;
            for (s = 0; s < n - t; ++s) this[s + t] = o[s % a];
          }
          return this;
        });
      var V = /[^+\/0-9A-Za-z-_]/g;
      function K(e, t) {
        var n;
        t = t || 1 / 0;
        for (var r = e.length, i = null, s = [], o = 0; o < r; ++o) {
          if ((n = e.charCodeAt(o)) > 55295 && n < 57344) {
            if (!i) {
              if (n > 56319) {
                (t -= 3) > -1 && s.push(239, 191, 189);
                continue;
              }
              if (o + 1 === r) {
                (t -= 3) > -1 && s.push(239, 191, 189);
                continue;
              }
              i = n;
              continue;
            }
            if (n < 56320) {
              (t -= 3) > -1 && s.push(239, 191, 189), (i = n);
              continue;
            }
            n = 65536 + (((i - 55296) << 10) | (n - 56320));
          } else i && (t -= 3) > -1 && s.push(239, 191, 189);
          if (((i = null), n < 128)) {
            if ((t -= 1) < 0) break;
            s.push(n);
          } else if (n < 2048) {
            if ((t -= 2) < 0) break;
            s.push((n >> 6) | 192, (63 & n) | 128);
          } else if (n < 65536) {
            if ((t -= 3) < 0) break;
            s.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((t -= 4) < 0) break;
            s.push((n >> 18) | 240, ((n >> 12) & 63) | 128, ((n >> 6) & 63) | 128, (63 & n) | 128);
          }
        }
        return s;
      }
      function q(e) {
        return r.toByteArray(
          (function (e) {
            if (
              (e = (function (e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
              })(e).replace(V, "")).length < 2
            )
              return "";
            for (; e.length % 4 != 0;) e += "=";
            return e;
          })(e)
        );
      }
      function L(e, t, n, r) {
        for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i) t[i + n] = e[i];
        return i;
      }
    },
    8249: function (e, t, n) {
      var r;
      e.exports =
        ((r =
          r ||
          (function (e, t) {
            var r;
            if (
              ("undefined" != typeof window && window.crypto && (r = window.crypto),
                "undefined" != typeof self && self.crypto && (r = self.crypto),
                "undefined" != typeof globalThis && globalThis.crypto && (r = globalThis.crypto),
                !r && "undefined" != typeof window && window.msCrypto && (r = window.msCrypto),
                !r && void 0 !== n.g && n.g.crypto && (r = n.g.crypto),
                !r)
            )
              try {
                r = n(2480);
              } catch (e) { }
            var i = function () {
              if (r) {
                if ("function" == typeof r.getRandomValues)
                  try {
                    return r.getRandomValues(new Uint32Array(1))[0];
                  } catch (e) { }
                if ("function" == typeof r.randomBytes)
                  try {
                    return r.randomBytes(4).readInt32LE();
                  } catch (e) { }
              }
              throw new Error("Native crypto module could not be used to get secure random number.");
            },
              s =
                Object.create ||
                (function () {
                  function e() { }
                  return function (t) {
                    var n;
                    return (e.prototype = t), (n = new e()), (e.prototype = null), n;
                  };
                })(),
              o = {},
              a = (o.lib = {}),
              u = (a.Base = {
                extend: function (e) {
                  var t = s(this);
                  return (
                    e && t.mixIn(e),
                    (t.hasOwnProperty("init") && this.init !== t.init) ||
                    (t.init = function () {
                      t.$super.init.apply(this, arguments);
                    }),
                    (t.init.prototype = t),
                    (t.$super = this),
                    t
                  );
                },
                create: function () {
                  var e = this.extend();
                  return e.init.apply(e, arguments), e;
                },
                init: function () { },
                mixIn: function (e) {
                  for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                  e.hasOwnProperty("toString") && (this.toString = e.toString);
                },
                clone: function () {
                  return this.init.prototype.extend(this);
                },
              }),
              c = (a.WordArray = u.extend({
                init: function (e, t) {
                  (e = this.words = e || []), (this.sigBytes = null != t ? t : 4 * e.length);
                },
                toString: function (e) {
                  return (e || f).stringify(this);
                },
                concat: function (e) {
                  var t = this.words,
                    n = e.words,
                    r = this.sigBytes,
                    i = e.sigBytes;
                  if ((this.clamp(), r % 4))
                    for (var s = 0; s < i; s++) {
                      var o = (n[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                      t[(r + s) >>> 2] |= o << (24 - ((r + s) % 4) * 8);
                    }
                  else for (var a = 0; a < i; a += 4) t[(r + a) >>> 2] = n[a >>> 2];
                  return (this.sigBytes += i), this;
                },
                clamp: function () {
                  var t = this.words,
                    n = this.sigBytes;
                  (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)), (t.length = e.ceil(n / 4));
                },
                clone: function () {
                  var e = u.clone.call(this);
                  return (e.words = this.words.slice(0)), e;
                },
                random: function (e) {
                  for (var t = [], n = 0; n < e; n += 4) t.push(i());
                  return new c.init(t, e);
                },
              })),
              h = (o.enc = {}),
              f = (h.Hex = {
                stringify: function (e) {
                  for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                    var s = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                    r.push((s >>> 4).toString(16)), r.push((15 & s).toString(16));
                  }
                  return r.join("");
                },
                parse: function (e) {
                  for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                  return new c.init(n, t / 2);
                },
              }),
              l = (h.Latin1 = {
                stringify: function (e) {
                  for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                    var s = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                    r.push(String.fromCharCode(s));
                  }
                  return r.join("");
                },
                parse: function (e) {
                  for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                  return new c.init(n, t);
                },
              }),
              g = (h.Utf8 = {
                stringify: function (e) {
                  try {
                    return decodeURIComponent(escape(l.stringify(e)));
                  } catch (e) {
                    throw new Error("Malformed UTF-8 data");
                  }
                },
                parse: function (e) {
                  return l.parse(unescape(encodeURIComponent(e)));
                },
              }),
              d = (a.BufferedBlockAlgorithm = u.extend({
                reset: function () {
                  (this._data = new c.init()), (this._nDataBytes = 0);
                },
                _append: function (e) {
                  "string" == typeof e && (e = g.parse(e)), this._data.concat(e), (this._nDataBytes += e.sigBytes);
                },
                _process: function (t) {
                  var n,
                    r = this._data,
                    i = r.words,
                    s = r.sigBytes,
                    o = this.blockSize,
                    a = s / (4 * o),
                    u = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,
                    h = e.min(4 * u, s);
                  if (u) {
                    for (var f = 0; f < u; f += o) this._doProcessBlock(i, f);
                    (n = i.splice(0, u)), (r.sigBytes -= h);
                  }
                  return new c.init(n, h);
                },
                clone: function () {
                  var e = u.clone.call(this);
                  return (e._data = this._data.clone()), e;
                },
                _minBufferSize: 0,
              })),
              p =
                ((a.Hasher = d.extend({
                  cfg: u.extend(),
                  init: function (e) {
                    (this.cfg = this.cfg.extend(e)), this.reset();
                  },
                  reset: function () {
                    d.reset.call(this), this._doReset();
                  },
                  update: function (e) {
                    return this._append(e), this._process(), this;
                  },
                  finalize: function (e) {
                    return e && this._append(e), this._doFinalize();
                  },
                  blockSize: 16,
                  _createHelper: function (e) {
                    return function (t, n) {
                      return new e.init(n).finalize(t);
                    };
                  },
                  _createHmacHelper: function (e) {
                    return function (t, n) {
                      return new p.HMAC.init(e, n).finalize(t);
                    };
                  },
                })),
                  (o.algo = {}));
            return o;
          })(Math)),
          r);
    },
    8269: function (e, t, n) {
      var r, i, s;
      e.exports =
        ((r = n(8249)),
          (s = (i = r).lib.WordArray),
          (i.enc.Base64 = {
            stringify: function (e) {
              var t = e.words,
                n = e.sigBytes,
                r = this._map;
              e.clamp();
              for (var i = [], s = 0; s < n; s += 3)
                for (
                  var o = (((t[s >>> 2] >>> (24 - (s % 4) * 8)) & 255) << 16) | (((t[(s + 1) >>> 2] >>> (24 - ((s + 1) % 4) * 8)) & 255) << 8) | ((t[(s + 2) >>> 2] >>> (24 - ((s + 2) % 4) * 8)) & 255), a = 0;
                  a < 4 && s + 0.75 * a < n;
                  a++
                )
                  i.push(r.charAt((o >>> (6 * (3 - a))) & 63));
              var u = r.charAt(64);
              if (u) for (; i.length % 4;) i.push(u);
              return i.join("");
            },
            parse: function (e) {
              var t = e.length,
                n = this._map,
                r = this._reverseMap;
              if (!r) {
                r = this._reverseMap = [];
                for (var i = 0; i < n.length; i++) r[n.charCodeAt(i)] = i;
              }
              var o = n.charAt(64);
              if (o) {
                var a = e.indexOf(o);
                -1 !== a && (t = a);
              }
              return (function (e, t, n) {
                for (var r = [], i = 0, o = 0; o < t; o++)
                  if (o % 4) {
                    var a = (n[e.charCodeAt(o - 1)] << ((o % 4) * 2)) | (n[e.charCodeAt(o)] >>> (6 - (o % 4) * 2));
                    (r[i >>> 2] |= a << (24 - (i % 4) * 8)), i++;
                  }
                return s.create(r, i);
              })(e, t, r);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          }),
          r.enc.Base64);
    },
    8010: function (e, t, n) {
      var r;
      e.exports = ((r = n(8249)), n(2153), n(9824), r.HmacSHA256);
    },
    9824: function (e, t, n) {
      var r, i, s;
      e.exports =
        ((i = (r = n(8249)).lib.Base),
          (s = r.enc.Utf8),
          void (r.algo.HMAC = i.extend({
            init: function (e, t) {
              (e = this._hasher = new e.init()), "string" == typeof t && (t = s.parse(t));
              var n = e.blockSize,
                r = 4 * n;
              t.sigBytes > r && (t = e.finalize(t)), t.clamp();
              for (var i = (this._oKey = t.clone()), o = (this._iKey = t.clone()), a = i.words, u = o.words, c = 0; c < n; c++) (a[c] ^= 1549556828), (u[c] ^= 909522486);
              (i.sigBytes = o.sigBytes = r), this.reset();
            },
            reset: function () {
              var e = this._hasher;
              e.reset(), e.update(this._iKey);
            },
            update: function (e) {
              return this._hasher.update(e), this;
            },
            finalize: function (e) {
              var t = this._hasher,
                n = t.finalize(e);
              return t.reset(), t.finalize(this._oKey.clone().concat(n));
            },
          })));
    },
    4433: function (e, t, n) {
      var r;
      e.exports =
        ((r = n(8249)),
          (function () {
            if ("function" == typeof ArrayBuffer) {
              var e = r.lib.WordArray,
                t = e.init,
                n = (e.init = function (e) {
                  if (
                    (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
                      (e instanceof Int8Array ||
                        ("undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray) ||
                        e instanceof Int16Array ||
                        e instanceof Uint16Array ||
                        e instanceof Int32Array ||
                        e instanceof Uint32Array ||
                        e instanceof Float32Array ||
                        e instanceof Float64Array) &&
                      (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)),
                      e instanceof Uint8Array)
                  ) {
                    for (var n = e.byteLength, r = [], i = 0; i < n; i++) r[i >>> 2] |= e[i] << (24 - (i % 4) * 8);
                    t.call(this, r, n);
                  } else t.apply(this, arguments);
                });
              n.prototype = e;
            }
          })(),
          r.lib.WordArray);
    },
    2153: function (e, t, n) {
      var r;
      e.exports =
        ((r = n(8249)),
          (function (e) {
            var t = r,
              n = t.lib,
              i = n.WordArray,
              s = n.Hasher,
              o = t.algo,
              a = [],
              u = [];
            !(function () {
              function t(t) {
                for (var n = e.sqrt(t), r = 2; r <= n; r++) if (!(t % r)) return !1;
                return !0;
              }
              function n(e) {
                return (4294967296 * (e - (0 | e))) | 0;
              }
              for (var r = 2, i = 0; i < 64;) t(r) && (i < 8 && (a[i] = n(e.pow(r, 0.5))), (u[i] = n(e.pow(r, 1 / 3))), i++), r++;
            })();
            var c = [],
              h = (o.SHA256 = s.extend({
                _doReset: function () {
                  this._hash = new i.init(a.slice(0));
                },
                _doProcessBlock: function (e, t) {
                  for (var n = this._hash.words, r = n[0], i = n[1], s = n[2], o = n[3], a = n[4], h = n[5], f = n[6], l = n[7], g = 0; g < 64; g++) {
                    if (g < 16) c[g] = 0 | e[t + g];
                    else {
                      var d = c[g - 15],
                        p = ((d << 25) | (d >>> 7)) ^ ((d << 14) | (d >>> 18)) ^ (d >>> 3),
                        v = c[g - 2],
                        y = ((v << 15) | (v >>> 17)) ^ ((v << 13) | (v >>> 19)) ^ (v >>> 10);
                      c[g] = p + c[g - 7] + y + c[g - 16];
                    }
                    var m = (r & i) ^ (r & s) ^ (i & s),
                      S = ((r << 30) | (r >>> 2)) ^ ((r << 19) | (r >>> 13)) ^ ((r << 10) | (r >>> 22)),
                      w = l + (((a << 26) | (a >>> 6)) ^ ((a << 21) | (a >>> 11)) ^ ((a << 7) | (a >>> 25))) + ((a & h) ^ (~a & f)) + u[g] + c[g];
                    (l = f), (f = h), (h = a), (a = (o + w) | 0), (o = s), (s = i), (i = r), (r = (w + (S + m)) | 0);
                  }
                  (n[0] = (n[0] + r) | 0), (n[1] = (n[1] + i) | 0), (n[2] = (n[2] + s) | 0), (n[3] = (n[3] + o) | 0), (n[4] = (n[4] + a) | 0), (n[5] = (n[5] + h) | 0), (n[6] = (n[6] + f) | 0), (n[7] = (n[7] + l) | 0);
                },
                _doFinalize: function () {
                  var t = this._data,
                    n = t.words,
                    r = 8 * this._nDataBytes,
                    i = 8 * t.sigBytes;
                  return (n[i >>> 5] |= 128 << (24 - (i % 32))), (n[14 + (((i + 64) >>> 9) << 4)] = e.floor(r / 4294967296)), (n[15 + (((i + 64) >>> 9) << 4)] = r), (t.sigBytes = 4 * n.length), this._process(), this._hash;
                },
                clone: function () {
                  var e = s.clone.call(this);
                  return (e._hash = this._hash.clone()), e;
                },
              }));
            (t.SHA256 = s._createHelper(h)), (t.HmacSHA256 = s._createHmacHelper(h));
          })(Math),
          r.SHA256);
    },
    645: (e, t) => {
      (t.read = function (e, t, n, r, i) {
        var s,
          o,
          a = 8 * i - r - 1,
          u = (1 << a) - 1,
          c = u >> 1,
          h = -7,
          f = n ? i - 1 : 0,
          l = n ? -1 : 1,
          g = e[t + f];
        for (f += l, s = g & ((1 << -h) - 1), g >>= -h, h += a; h > 0; s = 256 * s + e[t + f], f += l, h -= 8);
        for (o = s & ((1 << -h) - 1), s >>= -h, h += r; h > 0; o = 256 * o + e[t + f], f += l, h -= 8);
        if (0 === s) s = 1 - c;
        else {
          if (s === u) return o ? NaN : (1 / 0) * (g ? -1 : 1);
          (o += Math.pow(2, r)), (s -= c);
        }
        return (g ? -1 : 1) * o * Math.pow(2, s - r);
      }),
        (t.write = function (e, t, n, r, i, s) {
          var o,
            a,
            u,
            c = 8 * s - i - 1,
            h = (1 << c) - 1,
            f = h >> 1,
            l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            g = r ? 0 : s - 1,
            d = r ? 1 : -1,
            p = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            t = Math.abs(t),
            isNaN(t) || t === 1 / 0
              ? ((a = isNaN(t) ? 1 : 0), (o = h))
              : ((o = Math.floor(Math.log(t) / Math.LN2)),
                t * (u = Math.pow(2, -o)) < 1 && (o--, (u *= 2)),
                (t += o + f >= 1 ? l / u : l * Math.pow(2, 1 - f)) * u >= 2 && (o++, (u /= 2)),
                o + f >= h ? ((a = 0), (o = h)) : o + f >= 1 ? ((a = (t * u - 1) * Math.pow(2, i)), (o += f)) : ((a = t * Math.pow(2, f - 1) * Math.pow(2, i)), (o = 0)));
            i >= 8;
            e[n + g] = 255 & a, g += d, a /= 256, i -= 8
          );
          for (o = (o << i) | a, c += i; c > 0; e[n + g] = 255 & o, g += d, o /= 256, c -= 8);
          e[n + g - d] |= 128 * p;
        });
    },
    5826: (e) => {
      var t = {}.toString;
      e.exports =
        Array.isArray ||
        function (e) {
          return "[object Array]" == t.call(e);
        };
    },
    204: (e, t, n) => {
      e.exports = self.fetch || (self.fetch = n(5869).default || n(5869));
    },
    6808: (e, t, n) => {
      var r, i, s;
      (s = function () {
        function e() {
          for (var e = 0, t = {}; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) t[r] = n[r];
          }
          return t;
        }
        function t(e) {
          return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        }
        return (function n(r) {
          function i() { }
          function s(t, n, s) {
            if ("undefined" != typeof document) {
              "number" == typeof (s = e({ path: "/" }, i.defaults, s)).expires && (s.expires = new Date(1 * new Date() + 864e5 * s.expires)), (s.expires = s.expires ? s.expires.toUTCString() : "");
              try {
                var o = JSON.stringify(n);
                /^[\{\[]/.test(o) && (n = o);
              } catch (e) { }
              (n = r.write ? r.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
                (t = encodeURIComponent(String(t))
                  .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                  .replace(/[\(\)]/g, escape));
              var a = "";
              for (var u in s) s[u] && ((a += "; " + u), !0 !== s[u] && (a += "=" + s[u].split(";")[0]));
              return (document.cookie = t + "=" + n + a);
            }
          }
          function o(e, n) {
            if ("undefined" != typeof document) {
              for (var i = {}, s = document.cookie ? document.cookie.split("; ") : [], o = 0; o < s.length; o++) {
                var a = s[o].split("="),
                  u = a.slice(1).join("=");
                n || '"' !== u.charAt(0) || (u = u.slice(1, -1));
                try {
                  var c = t(a[0]);
                  if (((u = (r.read || r)(u, c) || t(u)), n))
                    try {
                      u = JSON.parse(u);
                    } catch (e) { }
                  if (((i[c] = u), e === c)) break;
                } catch (e) { }
              }
              return e ? i[e] : i;
            }
          }
          return (
            (i.set = s),
            (i.get = function (e) {
              return o(e, !1);
            }),
            (i.getJSON = function (e) {
              return o(e, !0);
            }),
            (i.remove = function (t, n) {
              s(t, "", e(n, { expires: -1 }));
            }),
            (i.defaults = {}),
            (i.withConverter = n),
            i
          );
        })(function () { });
      }),
        void 0 === (i = "function" == typeof (r = s) ? r.call(t, n, t, e) : r) || (e.exports = i),
        (e.exports = s());
    },
    5869: (e, t, n) => {
      "use strict";
      function r(e, t) {
        return (
          (t = t || {}),
          new Promise(function (n, r) {
            var i = new XMLHttpRequest(),
              s = [],
              o = [],
              a = {},
              u = function () {
                return {
                  ok: 2 == ((i.status / 100) | 0),
                  statusText: i.statusText,
                  status: i.status,
                  url: i.responseURL,
                  text: function () {
                    return Promise.resolve(i.responseText);
                  },
                  json: function () {
                    return Promise.resolve(i.responseText).then(JSON.parse);
                  },
                  blob: function () {
                    return Promise.resolve(new Blob([i.response]));
                  },
                  clone: u,
                  headers: {
                    keys: function () {
                      return s;
                    },
                    entries: function () {
                      return o;
                    },
                    get: function (e) {
                      return a[e.toLowerCase()];
                    },
                    has: function (e) {
                      return e.toLowerCase() in a;
                    },
                  },
                };
              };
            for (var c in (i.open(t.method || "get", e, !0),
              (i.onload = function () {
                i.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (e, t, n) {
                  s.push((t = t.toLowerCase())), o.push([t, n]), (a[t] = a[t] ? a[t] + "," + n : n);
                }),
                  n(u());
              }),
              (i.onerror = r),
              (i.withCredentials = "include" == t.credentials),
              t.headers))
              i.setRequestHeader(c, t.headers[c]);
            i.send(t.body || null);
          })
        );
      }
      n.r(t), n.d(t, { default: () => r });
    },
    6249: () => { },
    2480: () => { },
  },
    t = {};
  function n(r) {
    var i = t[r];
    if (void 0 !== i) return i.exports;
    var s = (t[r] = { exports: {} });
    return e[r].call(s.exports, s, s.exports, n), s.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      const e = "DefinioStorage-";
      class t {
        static syncPromise = null;
        static cache = new Map();
        static setItem(n, r) {
          chrome.storage.local.set({ [e + n]: r }), t.cache.set(n, r);
        }
        static getItem(e) {
          let n = null;
          return t.cache.has(e) && (n = t.cache.get(e)), n;
        }
        static removeItem(n) {
          chrome.storage.local.remove(e + n), t.cache.delete(n);
        }
        static clear() {
          return (cache = {}), cache;
        }
        static sync() {
          return (
            t.syncPromise ||
            (t.syncPromise = new Promise((n) => {
              var r;
              (r = (r) => {
                for (const [n, i] of Object.entries(r)) {
                  const r = n.replace(e, "");
                  t.cache.set(r, i);
                }
                n();
              }),
                chrome.storage.local.get(null, (t) => {
                  const n = Object.keys(t).filter((t) => t.startsWith(e));
                  chrome.storage.local.get(n, (e) => {
                    r(e);
                  });
                });
            })),
            t.syncPromise
          );
        }
      }
      var r,
        i = (function () {
          function e(e) {
            var t = e || {},
              n = t.ValidationData,
              r = t.Username,
              i = t.Password,
              s = t.AuthParameters,
              o = t.ClientMetadata;
            (this.validationData = n || {}), (this.authParameters = s || {}), (this.clientMetadata = o || {}), (this.username = r), (this.password = i);
          }
          var t = e.prototype;
          return (
            (t.getUsername = function () {
              return this.username;
            }),
            (t.getPassword = function () {
              return this.password;
            }),
            (t.getValidationData = function () {
              return this.validationData;
            }),
            (t.getAuthParameters = function () {
              return this.authParameters;
            }),
            (t.getClientMetadata = function () {
              return this.clientMetadata;
            }),
            e
          );
        })(),
        s = n(8764),
        o = n(8249),
        a = n.n(o),
        u = (n(4433), n(2153)),
        c = n.n(u),
        h = n(8010),
        f = n.n(h);
      if (("undefined" != typeof window && window.crypto && (r = window.crypto), !r && "undefined" != typeof window && window.msCrypto && (r = window.msCrypto), !r && void 0 !== n.g && n.g.crypto && (r = n.g.crypto), !r))
        try {
          r = n(6249);
        } catch (e) { }
      function l() {
        if (r) {
          if ("function" == typeof r.getRandomValues)
            try {
              return r.getRandomValues(new Uint32Array(1))[0];
            } catch (e) { }
          if ("function" == typeof r.randomBytes)
            try {
              return r.randomBytes(4).readInt32LE();
            } catch (e) { }
        }
        throw new Error("Native crypto module could not be used to get secure random number.");
      }
      var g = (function () {
        function e(e, t) {
          (e = this.words = e || []), (this.sigBytes = null != t ? t : 4 * e.length);
        }
        var t = e.prototype;
        return (
          (t.random = function (t) {
            for (var n = [], r = 0; r < t; r += 4) n.push(l());
            return new e(n, t);
          }),
          (t.toString = function () {
            return (function (e) {
              for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                var s = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                r.push((s >>> 4).toString(16)), r.push((15 & s).toString(16));
              }
              return r.join("");
            })(this);
          }),
          e
        );
      })();
      const d = p;
      function p(e, t) {
        null != e && this.fromString(e, t);
      }
      function v() {
        return new p(null);
      }
      var y,
        m = "undefined" != typeof navigator;
      m && "Microsoft Internet Explorer" == navigator.appName
        ? ((p.prototype.am = function (e, t, n, r, i, s) {
          for (var o = 32767 & t, a = t >> 15; --s >= 0;) {
            var u = 32767 & this[e],
              c = this[e++] >> 15,
              h = a * u + c * o;
            (i = ((u = o * u + ((32767 & h) << 15) + n[r] + (1073741823 & i)) >>> 30) + (h >>> 15) + a * c + (i >>> 30)), (n[r++] = 1073741823 & u);
          }
          return i;
        }),
          (y = 30))
        : m && "Netscape" != navigator.appName
          ? ((p.prototype.am = function (e, t, n, r, i, s) {
            for (; --s >= 0;) {
              var o = t * this[e++] + n[r] + i;
              (i = Math.floor(o / 67108864)), (n[r++] = 67108863 & o);
            }
            return i;
          }),
            (y = 26))
          : ((p.prototype.am = function (e, t, n, r, i, s) {
            for (var o = 16383 & t, a = t >> 14; --s >= 0;) {
              var u = 16383 & this[e],
                c = this[e++] >> 14,
                h = a * u + c * o;
              (i = ((u = o * u + ((16383 & h) << 14) + n[r] + i) >> 28) + (h >> 14) + a * c), (n[r++] = 268435455 & u);
            }
            return i;
          }),
            (y = 28)),
        (p.prototype.DB = y),
        (p.prototype.DM = (1 << y) - 1),
        (p.prototype.DV = 1 << y),
        (p.prototype.FV = Math.pow(2, 52)),
        (p.prototype.F1 = 52 - y),
        (p.prototype.F2 = 2 * y - 52);
      var S,
        w,
        A = new Array();
      for (S = "0".charCodeAt(0), w = 0; w <= 9; ++w) A[S++] = w;
      for (S = "a".charCodeAt(0), w = 10; w < 36; ++w) A[S++] = w;
      for (S = "A".charCodeAt(0), w = 10; w < 36; ++w) A[S++] = w;
      function C(e) {
        return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e);
      }
      function U(e, t) {
        var n = A[e.charCodeAt(t)];
        return null == n ? -1 : n;
      }
      function T(e) {
        var t = v();
        return t.fromInt(e), t;
      }
      function E(e) {
        var t,
          n = 1;
        return 0 != (t = e >>> 16) && ((e = t), (n += 16)), 0 != (t = e >> 8) && ((e = t), (n += 8)), 0 != (t = e >> 4) && ((e = t), (n += 4)), 0 != (t = e >> 2) && ((e = t), (n += 2)), 0 != (t = e >> 1) && ((e = t), (n += 1)), n;
      }
      function D(e) {
        (this.m = e), (this.mp = e.invDigit()), (this.mpl = 32767 & this.mp), (this.mph = this.mp >> 15), (this.um = (1 << (e.DB - 15)) - 1), (this.mt2 = 2 * e.t);
      }
      function I(e) {
        return s.Buffer.from(new g().random(e).toString(), "hex");
      }
      (D.prototype.convert = function (e) {
        var t = v();
        return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(p.ZERO) > 0 && this.m.subTo(t, t), t;
      }),
        (D.prototype.revert = function (e) {
          var t = v();
          return e.copyTo(t), this.reduce(t), t;
        }),
        (D.prototype.reduce = function (e) {
          for (; e.t <= this.mt2;) e[e.t++] = 0;
          for (var t = 0; t < this.m.t; ++t) {
            var n = 32767 & e[t],
              r = (n * this.mpl + (((n * this.mph + (e[t] >> 15) * this.mpl) & this.um) << 15)) & e.DM;
            for (e[(n = t + this.m.t)] += this.m.am(0, r, e, t, 0, this.m.t); e[n] >= e.DV;) (e[n] -= e.DV), e[++n]++;
          }
          e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e);
        }),
        (D.prototype.mulTo = function (e, t, n) {
          e.multiplyTo(t, n), this.reduce(n);
        }),
        (D.prototype.sqrTo = function (e, t) {
          e.squareTo(t), this.reduce(t);
        }),
        (p.prototype.copyTo = function (e) {
          for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
          (e.t = this.t), (e.s = this.s);
        }),
        (p.prototype.fromInt = function (e) {
          (this.t = 1), (this.s = e < 0 ? -1 : 0), e > 0 ? (this[0] = e) : e < -1 ? (this[0] = e + this.DV) : (this.t = 0);
        }),
        (p.prototype.fromString = function (e, t) {
          var n;
          if (16 == t) n = 4;
          else if (8 == t) n = 3;
          else if (2 == t) n = 1;
          else if (32 == t) n = 5;
          else {
            if (4 != t) throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
            n = 2;
          }
          (this.t = 0), (this.s = 0);
          for (var r = e.length, i = !1, s = 0; --r >= 0;) {
            var o = U(e, r);
            o < 0
              ? "-" == e.charAt(r) && (i = !0)
              : ((i = !1),
                0 == s ? (this[this.t++] = o) : s + n > this.DB ? ((this[this.t - 1] |= (o & ((1 << (this.DB - s)) - 1)) << s), (this[this.t++] = o >> (this.DB - s))) : (this[this.t - 1] |= o << s),
                (s += n) >= this.DB && (s -= this.DB));
          }
          this.clamp(), i && p.ZERO.subTo(this, this);
        }),
        (p.prototype.clamp = function () {
          for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;) --this.t;
        }),
        (p.prototype.dlShiftTo = function (e, t) {
          var n;
          for (n = this.t - 1; n >= 0; --n) t[n + e] = this[n];
          for (n = e - 1; n >= 0; --n) t[n] = 0;
          (t.t = this.t + e), (t.s = this.s);
        }),
        (p.prototype.drShiftTo = function (e, t) {
          for (var n = e; n < this.t; ++n) t[n - e] = this[n];
          (t.t = Math.max(this.t - e, 0)), (t.s = this.s);
        }),
        (p.prototype.lShiftTo = function (e, t) {
          var n,
            r = e % this.DB,
            i = this.DB - r,
            s = (1 << i) - 1,
            o = Math.floor(e / this.DB),
            a = (this.s << r) & this.DM;
          for (n = this.t - 1; n >= 0; --n) (t[n + o + 1] = (this[n] >> i) | a), (a = (this[n] & s) << r);
          for (n = o - 1; n >= 0; --n) t[n] = 0;
          (t[o] = a), (t.t = this.t + o + 1), (t.s = this.s), t.clamp();
        }),
        (p.prototype.rShiftTo = function (e, t) {
          t.s = this.s;
          var n = Math.floor(e / this.DB);
          if (n >= this.t) t.t = 0;
          else {
            var r = e % this.DB,
              i = this.DB - r,
              s = (1 << r) - 1;
            t[0] = this[n] >> r;
            for (var o = n + 1; o < this.t; ++o) (t[o - n - 1] |= (this[o] & s) << i), (t[o - n] = this[o] >> r);
            r > 0 && (t[this.t - n - 1] |= (this.s & s) << i), (t.t = this.t - n), t.clamp();
          }
        }),
        (p.prototype.subTo = function (e, t) {
          for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i;) (r += this[n] - e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
          if (e.t < this.t) {
            for (r -= e.s; n < this.t;) (r += this[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r += this.s;
          } else {
            for (r += this.s; n < e.t;) (r -= e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r -= e.s;
          }
          (t.s = r < 0 ? -1 : 0), r < -1 ? (t[n++] = this.DV + r) : r > 0 && (t[n++] = r), (t.t = n), t.clamp();
        }),
        (p.prototype.multiplyTo = function (e, t) {
          var n = this.abs(),
            r = e.abs(),
            i = n.t;
          for (t.t = i + r.t; --i >= 0;) t[i] = 0;
          for (i = 0; i < r.t; ++i) t[i + n.t] = n.am(0, r[i], t, i, 0, n.t);
          (t.s = 0), t.clamp(), this.s != e.s && p.ZERO.subTo(t, t);
        }),
        (p.prototype.squareTo = function (e) {
          for (var t = this.abs(), n = (e.t = 2 * t.t); --n >= 0;) e[n] = 0;
          for (n = 0; n < t.t - 1; ++n) {
            var r = t.am(n, t[n], e, 2 * n, 0, 1);
            (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && ((e[n + t.t] -= t.DV), (e[n + t.t + 1] = 1));
          }
          e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)), (e.s = 0), e.clamp();
        }),
        (p.prototype.divRemTo = function (e, t, n) {
          var r = e.abs();
          if (!(r.t <= 0)) {
            var i = this.abs();
            if (i.t < r.t) return null != t && t.fromInt(0), void (null != n && this.copyTo(n));
            null == n && (n = v());
            var s = v(),
              o = this.s,
              a = e.s,
              u = this.DB - E(r[r.t - 1]);
            u > 0 ? (r.lShiftTo(u, s), i.lShiftTo(u, n)) : (r.copyTo(s), i.copyTo(n));
            var c = s.t,
              h = s[c - 1];
            if (0 != h) {
              var f = h * (1 << this.F1) + (c > 1 ? s[c - 2] >> this.F2 : 0),
                l = this.FV / f,
                g = (1 << this.F1) / f,
                d = 1 << this.F2,
                y = n.t,
                m = y - c,
                S = null == t ? v() : t;
              for (s.dlShiftTo(m, S), n.compareTo(S) >= 0 && ((n[n.t++] = 1), n.subTo(S, n)), p.ONE.dlShiftTo(c, S), S.subTo(s, s); s.t < c;) s[s.t++] = 0;
              for (; --m >= 0;) {
                var w = n[--y] == h ? this.DM : Math.floor(n[y] * l + (n[y - 1] + d) * g);
                if ((n[y] += s.am(0, w, n, m, 0, c)) < w) for (s.dlShiftTo(m, S), n.subTo(S, n); n[y] < --w;) n.subTo(S, n);
              }
              null != t && (n.drShiftTo(c, t), o != a && p.ZERO.subTo(t, t)), (n.t = c), n.clamp(), u > 0 && n.rShiftTo(u, n), o < 0 && p.ZERO.subTo(n, n);
            }
          }
        }),
        (p.prototype.invDigit = function () {
          if (this.t < 1) return 0;
          var e = this[0];
          if (0 == (1 & e)) return 0;
          var t = 3 & e;
          return (t = ((t = ((t = ((t = (t * (2 - (15 & e) * t)) & 15) * (2 - (255 & e) * t)) & 255) * (2 - (((65535 & e) * t) & 65535))) & 65535) * (2 - ((e * t) % this.DV))) % this.DV) > 0 ? this.DV - t : -t;
        }),
        (p.prototype.addTo = function (e, t) {
          for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i;) (r += this[n] + e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
          if (e.t < this.t) {
            for (r += e.s; n < this.t;) (r += this[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r += this.s;
          } else {
            for (r += this.s; n < e.t;) (r += e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r += e.s;
          }
          (t.s = r < 0 ? -1 : 0), r > 0 ? (t[n++] = r) : r < -1 && (t[n++] = this.DV + r), (t.t = n), t.clamp();
        }),
        (p.prototype.toString = function (e) {
          if (this.s < 0) return "-" + this.negate().toString(e);
          var t;
          if (16 == e) t = 4;
          else if (8 == e) t = 3;
          else if (2 == e) t = 1;
          else if (32 == e) t = 5;
          else {
            if (4 != e) throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
            t = 2;
          }
          var n,
            r = (1 << t) - 1,
            i = !1,
            s = "",
            o = this.t,
            a = this.DB - ((o * this.DB) % t);
          if (o-- > 0)
            for (a < this.DB && (n = this[o] >> a) > 0 && ((i = !0), (s = C(n))); o >= 0;)
              a < t ? ((n = (this[o] & ((1 << a) - 1)) << (t - a)), (n |= this[--o] >> (a += this.DB - t))) : ((n = (this[o] >> (a -= t)) & r), a <= 0 && ((a += this.DB), --o)), n > 0 && (i = !0), i && (s += C(n));
          return i ? s : "0";
        }),
        (p.prototype.negate = function () {
          var e = v();
          return p.ZERO.subTo(this, e), e;
        }),
        (p.prototype.abs = function () {
          return this.s < 0 ? this.negate() : this;
        }),
        (p.prototype.compareTo = function (e) {
          var t = this.s - e.s;
          if (0 != t) return t;
          var n = this.t;
          if (0 != (t = n - e.t)) return this.s < 0 ? -t : t;
          for (; --n >= 0;) if (0 != (t = this[n] - e[n])) return t;
          return 0;
        }),
        (p.prototype.bitLength = function () {
          return this.t <= 0 ? 0 : this.DB * (this.t - 1) + E(this[this.t - 1] ^ (this.s & this.DM));
        }),
        (p.prototype.mod = function (e) {
          var t = v();
          return this.abs().divRemTo(e, null, t), this.s < 0 && t.compareTo(p.ZERO) > 0 && e.subTo(t, t), t;
        }),
        (p.prototype.equals = function (e) {
          return 0 == this.compareTo(e);
        }),
        (p.prototype.add = function (e) {
          var t = v();
          return this.addTo(e, t), t;
        }),
        (p.prototype.subtract = function (e) {
          var t = v();
          return this.subTo(e, t), t;
        }),
        (p.prototype.multiply = function (e) {
          var t = v();
          return this.multiplyTo(e, t), t;
        }),
        (p.prototype.divide = function (e) {
          var t = v();
          return this.divRemTo(e, t, null), t;
        }),
        (p.prototype.modPow = function (e, t, n) {
          var r,
            i = e.bitLength(),
            s = T(1),
            o = new D(t);
          if (i <= 0) return s;
          r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6;
          var a = new Array(),
            u = 3,
            c = r - 1,
            h = (1 << r) - 1;
          if (((a[1] = o.convert(this)), r > 1)) {
            var f = v();
            for (o.sqrTo(a[1], f); u <= h;) (a[u] = v()), o.mulTo(f, a[u - 2], a[u]), (u += 2);
          }
          var l,
            g,
            d = e.t - 1,
            p = !0,
            y = v();
          for (i = E(e[d]) - 1; d >= 0;) {
            for (i >= c ? (l = (e[d] >> (i - c)) & h) : ((l = (e[d] & ((1 << (i + 1)) - 1)) << (c - i)), d > 0 && (l |= e[d - 1] >> (this.DB + i - c))), u = r; 0 == (1 & l);) (l >>= 1), --u;
            if (((i -= u) < 0 && ((i += this.DB), --d), p)) a[l].copyTo(s), (p = !1);
            else {
              for (; u > 1;) o.sqrTo(s, y), o.sqrTo(y, s), (u -= 2);
              u > 0 ? o.sqrTo(s, y) : ((g = s), (s = y), (y = g)), o.mulTo(y, a[l], s);
            }
            for (; d >= 0 && 0 == (e[d] & (1 << i));) o.sqrTo(s, y), (g = s), (s = y), (y = g), --i < 0 && ((i = this.DB - 1), --d);
          }
          var m = o.revert(s);
          return n(null, m), m;
        }),
        (p.ZERO = T(0)),
        (p.ONE = T(1));
      var R = /^[89a-f]/i,
        b = (function () {
          function e(e) {
            (this.N = new d(
              "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF",
              16
            )),
              (this.g = new d("2", 16)),
              (this.k = new d(this.hexHash("" + this.padHex(this.N) + this.padHex(this.g)), 16)),
              (this.smallAValue = this.generateRandomSmallA()),
              this.getLargeAValue(function () { }),
              (this.infoBits = s.Buffer.from("Caldera Derived Key", "utf8")),
              (this.poolName = e);
          }
          var t = e.prototype;
          return (
            (t.getSmallAValue = function () {
              return this.smallAValue;
            }),
            (t.getLargeAValue = function (e) {
              var t = this;
              this.largeAValue
                ? e(null, this.largeAValue)
                : this.calculateA(this.smallAValue, function (n, r) {
                  n && e(n, null), (t.largeAValue = r), e(null, t.largeAValue);
                });
            }),
            (t.generateRandomSmallA = function () {
              var e = I(128).toString("hex");
              return new d(e, 16);
            }),
            (t.generateRandomString = function () {
              return I(40).toString("base64");
            }),
            (t.getRandomPassword = function () {
              return this.randomPassword;
            }),
            (t.getSaltDevices = function () {
              return this.SaltToHashDevices;
            }),
            (t.getVerifierDevices = function () {
              return this.verifierDevices;
            }),
            (t.generateHashDevice = function (e, t, n) {
              var r = this;
              this.randomPassword = this.generateRandomString();
              var i = "" + e + t + ":" + this.randomPassword,
                s = this.hash(i),
                o = I(16).toString("hex");
              (this.SaltToHashDevices = this.padHex(new d(o, 16))),
                this.g.modPow(new d(this.hexHash(this.SaltToHashDevices + s), 16), this.N, function (e, t) {
                  e && n(e, null), (r.verifierDevices = r.padHex(t)), n(null, null);
                });
            }),
            (t.calculateA = function (e, t) {
              var n = this;
              this.g.modPow(e, this.N, function (e, r) {
                e && t(e, null), r.mod(n.N).equals(d.ZERO) && t(new Error("Illegal paramater. A mod N cannot be 0."), null), t(null, r);
              });
            }),
            (t.calculateU = function (e, t) {
              return (this.UHexHash = this.hexHash(this.padHex(e) + this.padHex(t))), new d(this.UHexHash, 16);
            }),
            (t.hash = function (e) {
              var t = e instanceof s.Buffer ? a().lib.WordArray.create(e) : e,
                n = c()(t).toString();
              return new Array(64 - n.length).join("0") + n;
            }),
            (t.hexHash = function (e) {
              return this.hash(s.Buffer.from(e, "hex"));
            }),
            (t.computehkdf = function (e, t) {
              var n = a().lib.WordArray.create(s.Buffer.concat([this.infoBits, s.Buffer.from(String.fromCharCode(1), "utf8")])),
                r = e instanceof s.Buffer ? a().lib.WordArray.create(e) : e,
                i = t instanceof s.Buffer ? a().lib.WordArray.create(t) : t,
                o = f()(r, i),
                u = f()(n, o);
              return s.Buffer.from(u.toString(), "hex").slice(0, 16);
            }),
            (t.getPasswordAuthenticationKey = function (e, t, n, r, i) {
              var o = this;
              if (n.mod(this.N).equals(d.ZERO)) throw new Error("B cannot be zero.");
              if (((this.UValue = this.calculateU(this.largeAValue, n)), this.UValue.equals(d.ZERO))) throw new Error("U cannot be zero.");
              var a = "" + this.poolName + e + ":" + t,
                u = this.hash(a),
                c = new d(this.hexHash(this.padHex(r) + u), 16);
              this.calculateS(c, n, function (e, t) {
                e && i(e, null);
                var n = o.computehkdf(s.Buffer.from(o.padHex(t), "hex"), s.Buffer.from(o.padHex(o.UValue), "hex"));
                i(null, n);
              });
            }),
            (t.calculateS = function (e, t, n) {
              var r = this;
              this.g.modPow(e, this.N, function (i, s) {
                i && n(i, null),
                  t.subtract(r.k.multiply(s)).modPow(r.smallAValue.add(r.UValue.multiply(e)), r.N, function (e, t) {
                    e && n(e, null), n(null, t.mod(r.N));
                  });
              });
            }),
            (t.getNewPasswordRequiredChallengeUserAttributePrefix = function () {
              return "userAttributes.";
            }),
            (t.padHex = function (e) {
              if (!(e instanceof d)) throw new Error("Not a BigInteger");
              var t = e.compareTo(d.ZERO) < 0,
                n = e.abs().toString(16);
              if (((n = n.length % 2 != 0 ? "0" + n : n), (n = R.test(n) ? "00" + n : n), t)) {
                var r = n
                  .split("")
                  .map(function (e) {
                    var t = 15 & ~parseInt(e, 16);
                    return "0123456789ABCDEF".charAt(t);
                  })
                  .join("");
                (n = new d(r, 16).add(d.ONE).toString(16)).toUpperCase().startsWith("FF8") && (n = n.substring(2));
              }
              return n;
            }),
            e
          );
        })(),
        P = (function () {
          function e(e) {
            (this.jwtToken = e || ""), (this.payload = this.decodePayload());
          }
          var t = e.prototype;
          return (
            (t.getJwtToken = function () {
              return this.jwtToken;
            }),
            (t.getExpiration = function () {
              return this.payload.exp;
            }),
            (t.getIssuedAt = function () {
              return this.payload.iat;
            }),
            (t.decodePayload = function () {
              var e = this.jwtToken.split(".")[1];
              try {
                return JSON.parse(s.Buffer.from(e, "base64").toString("utf8"));
              } catch (e) {
                return {};
              }
            }),
            e
          );
        })();
      function k(e, t) {
        return (
          (k = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
              return (e.__proto__ = t), e;
            }),
          k(e, t)
        );
      }
      var _ = (function (e) {
        var t, n;
        function r(t) {
          var n = (void 0 === t ? {} : t).AccessToken;
          return e.call(this, n || "") || this;
        }
        return (n = e), ((t = r).prototype = Object.create(n.prototype)), (t.prototype.constructor = t), k(t, n), r;
      })(P);
      function B(e, t) {
        return (
          (B = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
              return (e.__proto__ = t), e;
            }),
          B(e, t)
        );
      }
      var F = (function (e) {
        var t, n;
        function r(t) {
          var n = (void 0 === t ? {} : t).IdToken;
          return e.call(this, n || "") || this;
        }
        return (n = e), ((t = r).prototype = Object.create(n.prototype)), (t.prototype.constructor = t), B(t, n), r;
      })(P),
        M = (function () {
          function e(e) {
            var t = (void 0 === e ? {} : e).RefreshToken;
            this.token = t || "";
          }
          return (
            (e.prototype.getToken = function () {
              return this.token;
            }),
            e
          );
        })(),
        x = n(8269),
        O = n.n(x),
        N = (function () {
          function e(e) {
            var t = void 0 === e ? {} : e,
              n = t.IdToken,
              r = t.RefreshToken,
              i = t.AccessToken,
              s = t.ClockDrift;
            if (null == i || null == n) throw new Error("Id token and Access Token must be present.");
            (this.idToken = n), (this.refreshToken = r), (this.accessToken = i), (this.clockDrift = void 0 === s ? this.calculateClockDrift() : s);
          }
          var t = e.prototype;
          return (
            (t.getIdToken = function () {
              return this.idToken;
            }),
            (t.getRefreshToken = function () {
              return this.refreshToken;
            }),
            (t.getAccessToken = function () {
              return this.accessToken;
            }),
            (t.getClockDrift = function () {
              return this.clockDrift;
            }),
            (t.calculateClockDrift = function () {
              return Math.floor(new Date() / 1e3) - Math.min(this.accessToken.getIssuedAt(), this.idToken.getIssuedAt());
            }),
            (t.isValid = function () {
              var e = Math.floor(new Date() / 1e3) - this.clockDrift;
              return e < this.accessToken.getExpiration() && e < this.idToken.getExpiration();
            }),
            e
          );
        })(),
        V = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        K = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        q = (function () {
          function e() { }
          return (
            (e.prototype.getNowString = function () {
              var e = new Date(),
                t = K[e.getUTCDay()],
                n = V[e.getUTCMonth()],
                r = e.getUTCDate(),
                i = e.getUTCHours();
              i < 10 && (i = "0" + i);
              var s = e.getUTCMinutes();
              s < 10 && (s = "0" + s);
              var o = e.getUTCSeconds();
              return o < 10 && (o = "0" + o), t + " " + n + " " + r + " " + i + ":" + s + ":" + o + " UTC " + e.getUTCFullYear();
            }),
            e
          );
        })(),
        L = (function () {
          function e(e) {
            var t = void 0 === e ? {} : e,
              n = t.Name,
              r = t.Value;
            (this.Name = n || ""), (this.Value = r || "");
          }
          var t = e.prototype;
          return (
            (t.getValue = function () {
              return this.Value;
            }),
            (t.setValue = function (e) {
              return (this.Value = e), this;
            }),
            (t.getName = function () {
              return this.Name;
            }),
            (t.setName = function (e) {
              return (this.Name = e), this;
            }),
            (t.toString = function () {
              return JSON.stringify(this);
            }),
            (t.toJSON = function () {
              return { Name: this.Name, Value: this.Value };
            }),
            e
          );
        })(),
        H = {},
        Y = (function () {
          function e() { }
          return (
            (e.setItem = function (e, t) {
              return (H[e] = t), H[e];
            }),
            (e.getItem = function (e) {
              return Object.prototype.hasOwnProperty.call(H, e) ? H[e] : void 0;
            }),
            (e.removeItem = function (e) {
              return delete H[e];
            }),
            (e.clear = function () {
              return (H = {});
            }),
            e
          );
        })(),
        j = (function () {
          function e() {
            try {
              (this.storageWindow = window.localStorage), this.storageWindow.setItem("aws.cognito.test-ls", 1), this.storageWindow.removeItem("aws.cognito.test-ls");
            } catch (e) {
              this.storageWindow = Y;
            }
          }
          return (
            (e.prototype.getStorage = function () {
              return this.storageWindow;
            }),
            e
          );
        })(),
        W = "undefined" != typeof navigator ? navigator.userAgent : "nodejs",
        J = (function () {
          function e(e) {
            if (null == e || null == e.Username || null == e.Pool) throw new Error("Username and Pool information are required.");
            (this.username = e.Username || ""),
              (this.pool = e.Pool),
              (this.Session = null),
              (this.client = e.Pool.client),
              (this.signInUserSession = null),
              (this.authenticationFlowType = "USER_SRP_AUTH"),
              (this.storage = e.Storage || new j().getStorage()),
              (this.keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId()),
              (this.userDataKey = this.keyPrefix + "." + this.username + ".userData");
          }
          var t = e.prototype;
          return (
            (t.setSignInUserSession = function (e) {
              this.clearCachedUserData(), (this.signInUserSession = e), this.cacheTokens();
            }),
            (t.getSignInUserSession = function () {
              return this.signInUserSession;
            }),
            (t.getUsername = function () {
              return this.username;
            }),
            (t.getAuthenticationFlowType = function () {
              return this.authenticationFlowType;
            }),
            (t.setAuthenticationFlowType = function (e) {
              this.authenticationFlowType = e;
            }),
            (t.initiateAuth = function (e, t) {
              var n = this,
                r = e.getAuthParameters();
              r.USERNAME = this.username;
              var i = 0 !== Object.keys(e.getValidationData()).length ? e.getValidationData() : e.getClientMetadata(),
                s = { AuthFlow: "CUSTOM_AUTH", ClientId: this.pool.getClientId(), AuthParameters: r, ClientMetadata: i };
              this.getUserContextData() && (s.UserContextData = this.getUserContextData()),
                this.client.request("InitiateAuth", s, function (e, r) {
                  if (e) return t.onFailure(e);
                  var i = r.ChallengeName,
                    s = r.ChallengeParameters;
                  return "CUSTOM_CHALLENGE" === i
                    ? ((n.Session = r.Session), t.customChallenge(s))
                    : ((n.signInUserSession = n.getCognitoUserSession(r.AuthenticationResult)), n.cacheTokens(), t.onSuccess(n.signInUserSession));
                });
            }),
            (t.authenticateUser = function (e, t) {
              return "USER_PASSWORD_AUTH" === this.authenticationFlowType
                ? this.authenticateUserPlainUsernamePassword(e, t)
                : "USER_SRP_AUTH" === this.authenticationFlowType || "CUSTOM_AUTH" === this.authenticationFlowType
                  ? this.authenticateUserDefaultAuth(e, t)
                  : t.onFailure(new Error("Authentication flow type is invalid."));
            }),
            (t.authenticateUserDefaultAuth = function (e, t) {
              var n,
                r,
                i = this,
                o = new b(this.pool.getUserPoolName()),
                u = new q(),
                c = {};
              null != this.deviceKey && (c.DEVICE_KEY = this.deviceKey),
                (c.USERNAME = this.username),
                o.getLargeAValue(function (h, l) {
                  h && t.onFailure(h), (c.SRP_A = l.toString(16)), "CUSTOM_AUTH" === i.authenticationFlowType && (c.CHALLENGE_NAME = "SRP_A");
                  var g = 0 !== Object.keys(e.getValidationData()).length ? e.getValidationData() : e.getClientMetadata(),
                    p = { AuthFlow: i.authenticationFlowType, ClientId: i.pool.getClientId(), AuthParameters: c, ClientMetadata: g };
                  i.getUserContextData(i.username) && (p.UserContextData = i.getUserContextData(i.username)),
                    i.client.request("InitiateAuth", p, function (c, h) {
                      if (c) return t.onFailure(c);
                      var l = h.ChallengeParameters;
                      (i.username = l.USER_ID_FOR_SRP),
                        (i.userDataKey = i.keyPrefix + "." + i.username + ".userData"),
                        (n = new d(l.SRP_B, 16)),
                        (r = new d(l.SALT, 16)),
                        i.getCachedDeviceKeyAndPassword(),
                        o.getPasswordAuthenticationKey(i.username, e.getPassword(), n, r, function (e, n) {
                          e && t.onFailure(e);
                          var r = u.getNowString(),
                            c = a().lib.WordArray.create(
                              s.Buffer.concat([s.Buffer.from(i.pool.getUserPoolName(), "utf8"), s.Buffer.from(i.username, "utf8"), s.Buffer.from(l.SECRET_BLOCK, "base64"), s.Buffer.from(r, "utf8")])
                            ),
                            d = a().lib.WordArray.create(n),
                            p = O().stringify(f()(c, d)),
                            v = {};
                          (v.USERNAME = i.username), (v.PASSWORD_CLAIM_SECRET_BLOCK = l.SECRET_BLOCK), (v.TIMESTAMP = r), (v.PASSWORD_CLAIM_SIGNATURE = p), null != i.deviceKey && (v.DEVICE_KEY = i.deviceKey);
                          var y = { ChallengeName: "PASSWORD_VERIFIER", ClientId: i.pool.getClientId(), ChallengeResponses: v, Session: h.Session, ClientMetadata: g };
                          i.getUserContextData() && (y.UserContextData = i.getUserContextData()),
                            (function e(t, n) {
                              return i.client.request("RespondToAuthChallenge", t, function (r, s) {
                                return r && "ResourceNotFoundException" === r.code && -1 !== r.message.toLowerCase().indexOf("device")
                                  ? ((v.DEVICE_KEY = null), (i.deviceKey = null), (i.randomPassword = null), (i.deviceGroupKey = null), i.clearCachedDeviceKeyAndPassword(), e(t, n))
                                  : n(r, s);
                              });
                            })(y, function (e, n) {
                              return e ? t.onFailure(e) : i.authenticateUserInternal(n, o, t);
                            });
                        });
                    });
                });
            }),
            (t.authenticateUserPlainUsernamePassword = function (e, t) {
              var n = this,
                r = {};
              if (((r.USERNAME = this.username), (r.PASSWORD = e.getPassword()), r.PASSWORD)) {
                var i = new b(this.pool.getUserPoolName());
                this.getCachedDeviceKeyAndPassword(), null != this.deviceKey && (r.DEVICE_KEY = this.deviceKey);
                var s = 0 !== Object.keys(e.getValidationData()).length ? e.getValidationData() : e.getClientMetadata(),
                  o = { AuthFlow: "USER_PASSWORD_AUTH", ClientId: this.pool.getClientId(), AuthParameters: r, ClientMetadata: s };
                this.getUserContextData(this.username) && (o.UserContextData = this.getUserContextData(this.username)),
                  this.client.request("InitiateAuth", o, function (e, r) {
                    return e ? t.onFailure(e) : n.authenticateUserInternal(r, i, t);
                  });
              } else t.onFailure(new Error("PASSWORD parameter is required"));
            }),
            (t.authenticateUserInternal = function (e, t, n) {
              var r = this,
                i = e.ChallengeName,
                o = e.ChallengeParameters;
              if ("SMS_MFA" === i) return (this.Session = e.Session), n.mfaRequired(i, o);
              if ("SELECT_MFA_TYPE" === i) return (this.Session = e.Session), n.selectMFAType(i, o);
              if ("MFA_SETUP" === i) return (this.Session = e.Session), n.mfaSetup(i, o);
              if ("SOFTWARE_TOKEN_MFA" === i) return (this.Session = e.Session), n.totpRequired(i, o);
              if ("CUSTOM_CHALLENGE" === i) return (this.Session = e.Session), n.customChallenge(o);
              if ("NEW_PASSWORD_REQUIRED" === i) {
                this.Session = e.Session;
                var a = null,
                  u = null,
                  c = [],
                  h = t.getNewPasswordRequiredChallengeUserAttributePrefix();
                if ((o && ((a = JSON.parse(e.ChallengeParameters.userAttributes)), (u = JSON.parse(e.ChallengeParameters.requiredAttributes))), u)) for (var f = 0; f < u.length; f++) c[f] = u[f].substr(h.length);
                return n.newPasswordRequired(a, c);
              }
              if ("DEVICE_SRP_AUTH" === i) return (this.Session = e.Session), void this.getDeviceResponse(n);
              (this.signInUserSession = this.getCognitoUserSession(e.AuthenticationResult)), (this.challengeName = i), this.cacheTokens();
              var l = e.AuthenticationResult.NewDeviceMetadata;
              if (null == l) return n.onSuccess(this.signInUserSession);
              t.generateHashDevice(e.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, e.AuthenticationResult.NewDeviceMetadata.DeviceKey, function (i) {
                if (i) return n.onFailure(i);
                var o = { Salt: s.Buffer.from(t.getSaltDevices(), "hex").toString("base64"), PasswordVerifier: s.Buffer.from(t.getVerifierDevices(), "hex").toString("base64") };
                (r.verifierDevices = o.PasswordVerifier),
                  (r.deviceGroupKey = l.DeviceGroupKey),
                  (r.randomPassword = t.getRandomPassword()),
                  r.client.request("ConfirmDevice", { DeviceKey: l.DeviceKey, AccessToken: r.signInUserSession.getAccessToken().getJwtToken(), DeviceSecretVerifierConfig: o, DeviceName: W }, function (t, i) {
                    return t
                      ? n.onFailure(t)
                      : ((r.deviceKey = e.AuthenticationResult.NewDeviceMetadata.DeviceKey),
                        r.cacheDeviceKeyAndPassword(),
                        !0 === i.UserConfirmationNecessary ? n.onSuccess(r.signInUserSession, i.UserConfirmationNecessary) : n.onSuccess(r.signInUserSession));
                  });
              });
            }),
            (t.completeNewPasswordChallenge = function (e, t, n, r) {
              var i = this;
              if (!e) return n.onFailure(new Error("New password is required."));
              var s = new b(this.pool.getUserPoolName()),
                o = s.getNewPasswordRequiredChallengeUserAttributePrefix(),
                a = {};
              t &&
                Object.keys(t).forEach(function (e) {
                  a[o + e] = t[e];
                }),
                (a.NEW_PASSWORD = e),
                (a.USERNAME = this.username);
              var u = { ChallengeName: "NEW_PASSWORD_REQUIRED", ClientId: this.pool.getClientId(), ChallengeResponses: a, Session: this.Session, ClientMetadata: r };
              this.getUserContextData() && (u.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", u, function (e, t) {
                  return e ? n.onFailure(e) : i.authenticateUserInternal(t, s, n);
                });
            }),
            (t.getDeviceResponse = function (e, t) {
              var n = this,
                r = new b(this.deviceGroupKey),
                i = new q(),
                o = {};
              (o.USERNAME = this.username),
                (o.DEVICE_KEY = this.deviceKey),
                r.getLargeAValue(function (u, c) {
                  u && e.onFailure(u), (o.SRP_A = c.toString(16));
                  var h = { ChallengeName: "DEVICE_SRP_AUTH", ClientId: n.pool.getClientId(), ChallengeResponses: o, ClientMetadata: t, Session: n.Session };
                  n.getUserContextData() && (h.UserContextData = n.getUserContextData()),
                    n.client.request("RespondToAuthChallenge", h, function (t, o) {
                      if (t) return e.onFailure(t);
                      var u = o.ChallengeParameters,
                        c = new d(u.SRP_B, 16),
                        h = new d(u.SALT, 16);
                      r.getPasswordAuthenticationKey(n.deviceKey, n.randomPassword, c, h, function (t, r) {
                        if (t) return e.onFailure(t);
                        var c = i.getNowString(),
                          h = a().lib.WordArray.create(
                            s.Buffer.concat([s.Buffer.from(n.deviceGroupKey, "utf8"), s.Buffer.from(n.deviceKey, "utf8"), s.Buffer.from(u.SECRET_BLOCK, "base64"), s.Buffer.from(c, "utf8")])
                          ),
                          l = a().lib.WordArray.create(r),
                          g = O().stringify(f()(h, l)),
                          d = {};
                        (d.USERNAME = n.username), (d.PASSWORD_CLAIM_SECRET_BLOCK = u.SECRET_BLOCK), (d.TIMESTAMP = c), (d.PASSWORD_CLAIM_SIGNATURE = g), (d.DEVICE_KEY = n.deviceKey);
                        var p = { ChallengeName: "DEVICE_PASSWORD_VERIFIER", ClientId: n.pool.getClientId(), ChallengeResponses: d, Session: o.Session };
                        n.getUserContextData() && (p.UserContextData = n.getUserContextData()),
                          n.client.request("RespondToAuthChallenge", p, function (t, r) {
                            return t ? e.onFailure(t) : ((n.signInUserSession = n.getCognitoUserSession(r.AuthenticationResult)), n.cacheTokens(), e.onSuccess(n.signInUserSession));
                          });
                      });
                    });
                });
            }),
            (t.confirmRegistration = function (e, t, n, r) {
              var i = { ClientId: this.pool.getClientId(), ConfirmationCode: e, Username: this.username, ForceAliasCreation: t, ClientMetadata: r };
              this.getUserContextData() && (i.UserContextData = this.getUserContextData()),
                this.client.request("ConfirmSignUp", i, function (e) {
                  return e ? n(e, null) : n(null, "SUCCESS");
                });
            }),
            (t.sendCustomChallengeAnswer = function (e, t, n) {
              var r = this,
                i = {};
              (i.USERNAME = this.username), (i.ANSWER = e);
              var s = new b(this.pool.getUserPoolName());
              this.getCachedDeviceKeyAndPassword(), null != this.deviceKey && (i.DEVICE_KEY = this.deviceKey);
              var o = { ChallengeName: "CUSTOM_CHALLENGE", ChallengeResponses: i, ClientId: this.pool.getClientId(), Session: this.Session, ClientMetadata: n };
              this.getUserContextData() && (o.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", o, function (e, n) {
                  return e ? t.onFailure(e) : r.authenticateUserInternal(n, s, t);
                });
            }),
            (t.sendMFACode = function (e, t, n, r) {
              var i = this,
                o = {};
              (o.USERNAME = this.username), (o.SMS_MFA_CODE = e);
              var a = n || "SMS_MFA";
              "SOFTWARE_TOKEN_MFA" === a && (o.SOFTWARE_TOKEN_MFA_CODE = e), null != this.deviceKey && (o.DEVICE_KEY = this.deviceKey);
              var u = { ChallengeName: a, ChallengeResponses: o, ClientId: this.pool.getClientId(), Session: this.Session, ClientMetadata: r };
              this.getUserContextData() && (u.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", u, function (e, n) {
                  if (e) return t.onFailure(e);
                  if ("DEVICE_SRP_AUTH" !== n.ChallengeName) {
                    if (((i.signInUserSession = i.getCognitoUserSession(n.AuthenticationResult)), i.cacheTokens(), null == n.AuthenticationResult.NewDeviceMetadata)) return t.onSuccess(i.signInUserSession);
                    var r = new b(i.pool.getUserPoolName());
                    r.generateHashDevice(n.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, n.AuthenticationResult.NewDeviceMetadata.DeviceKey, function (e) {
                      if (e) return t.onFailure(e);
                      var o = { Salt: s.Buffer.from(r.getSaltDevices(), "hex").toString("base64"), PasswordVerifier: s.Buffer.from(r.getVerifierDevices(), "hex").toString("base64") };
                      (i.verifierDevices = o.PasswordVerifier),
                        (i.deviceGroupKey = n.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey),
                        (i.randomPassword = r.getRandomPassword()),
                        i.client.request(
                          "ConfirmDevice",
                          { DeviceKey: n.AuthenticationResult.NewDeviceMetadata.DeviceKey, AccessToken: i.signInUserSession.getAccessToken().getJwtToken(), DeviceSecretVerifierConfig: o, DeviceName: W },
                          function (e, r) {
                            return e
                              ? t.onFailure(e)
                              : ((i.deviceKey = n.AuthenticationResult.NewDeviceMetadata.DeviceKey),
                                i.cacheDeviceKeyAndPassword(),
                                !0 === r.UserConfirmationNecessary ? t.onSuccess(i.signInUserSession, r.UserConfirmationNecessary) : t.onSuccess(i.signInUserSession));
                          }
                        );
                    });
                  } else i.getDeviceResponse(t);
                });
            }),
            (t.changePassword = function (e, t, n, r) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return n(new Error("User is not authenticated"), null);
              this.client.request("ChangePassword", { PreviousPassword: e, ProposedPassword: t, AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), ClientMetadata: r }, function (e) {
                return e ? n(e, null) : n(null, "SUCCESS");
              });
            }),
            (t.enableMFA = function (e) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e(new Error("User is not authenticated"), null);
              var t = [];
              t.push({ DeliveryMedium: "SMS", AttributeName: "phone_number" }),
                this.client.request("SetUserSettings", { MFAOptions: t, AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (t) {
                  return t ? e(t, null) : e(null, "SUCCESS");
                });
            }),
            (t.setUserMfaPreference = function (e, t, n) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return n(new Error("User is not authenticated"), null);
              this.client.request("SetUserMFAPreference", { SMSMfaSettings: e, SoftwareTokenMfaSettings: t, AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (e) {
                return e ? n(e, null) : n(null, "SUCCESS");
              });
            }),
            (t.disableMFA = function (e) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e(new Error("User is not authenticated"), null);
              this.client.request("SetUserSettings", { MFAOptions: [], AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (t) {
                return t ? e(t, null) : e(null, "SUCCESS");
              });
            }),
            (t.deleteUser = function (e, t) {
              var n = this;
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e(new Error("User is not authenticated"), null);
              this.client.request("DeleteUser", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), ClientMetadata: t }, function (t) {
                return t ? e(t, null) : (n.clearCachedUser(), e(null, "SUCCESS"));
              });
            }),
            (t.updateAttributes = function (e, t, n) {
              var r = this;
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return t(new Error("User is not authenticated"), null);
              this.client.request("UpdateUserAttributes", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), UserAttributes: e, ClientMetadata: n }, function (e) {
                return e
                  ? t(e, null)
                  : r.getUserData(
                    function () {
                      return t(null, "SUCCESS");
                    },
                    { bypassCache: !0 }
                  );
              });
            }),
            (t.getUserAttributes = function (e) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e(new Error("User is not authenticated"), null);
              this.client.request("GetUser", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (t, n) {
                if (t) return e(t, null);
                for (var r = [], i = 0; i < n.UserAttributes.length; i++) {
                  var s = { Name: n.UserAttributes[i].Name, Value: n.UserAttributes[i].Value },
                    o = new L(s);
                  r.push(o);
                }
                return e(null, r);
              });
            }),
            (t.getMFAOptions = function (e) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e(new Error("User is not authenticated"), null);
              this.client.request("GetUser", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (t, n) {
                return t ? e(t, null) : e(null, n.MFAOptions);
              });
            }),
            (t.createGetUserRequest = function () {
              return this.client.promisifyRequest("GetUser", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken() });
            }),
            (t.refreshSessionIfPossible = function (e) {
              var t = this;
              return (
                void 0 === e && (e = {}),
                new Promise(function (n) {
                  var r = t.signInUserSession.getRefreshToken();
                  r && r.getToken() ? t.refreshSession(r, n, e.clientMetadata) : n();
                })
              );
            }),
            (t.getUserData = function (e, t) {
              var n = this;
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return this.clearCachedUserData(), e(new Error("User is not authenticated"), null);
              var r = this.getUserDataFromCache();
              if (r)
                if (this.isFetchUserDataAndTokenRequired(t))
                  this.fetchUserData()
                    .then(function (e) {
                      return n.refreshSessionIfPossible(t).then(function () {
                        return e;
                      });
                    })
                    .then(function (t) {
                      return e(null, t);
                    })
                    .catch(e);
                else
                  try {
                    return void e(null, JSON.parse(r));
                  } catch (t) {
                    return this.clearCachedUserData(), void e(t, null);
                  }
              else
                this.fetchUserData()
                  .then(function (t) {
                    e(null, t);
                  })
                  .catch(e);
            }),
            (t.getUserDataFromCache = function () {
              return this.storage.getItem(this.userDataKey);
            }),
            (t.isFetchUserDataAndTokenRequired = function (e) {
              var t = (e || {}).bypassCache;
              return void 0 !== t && t;
            }),
            (t.fetchUserData = function () {
              var e = this;
              return this.createGetUserRequest().then(function (t) {
                return e.cacheUserData(t), t;
              });
            }),
            (t.deleteAttributes = function (e, t) {
              var n = this;
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return t(new Error("User is not authenticated"), null);
              this.client.request("DeleteUserAttributes", { UserAttributeNames: e, AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (e) {
                return e
                  ? t(e, null)
                  : n.getUserData(
                    function () {
                      return t(null, "SUCCESS");
                    },
                    { bypassCache: !0 }
                  );
              });
            }),
            (t.resendConfirmationCode = function (e, t) {
              var n = { ClientId: this.pool.getClientId(), Username: this.username, ClientMetadata: t };
              this.client.request("ResendConfirmationCode", n, function (t, n) {
                return t ? e(t, null) : e(null, n);
              });
            }),
            (t.getSession = function (e, t) {
              if ((void 0 === t && (t = {}), null == this.username)) return e(new Error("Username is null. Cannot retrieve a new session"), null);
              if (null != this.signInUserSession && this.signInUserSession.isValid()) return e(null, this.signInUserSession);
              var n = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username,
                r = n + ".idToken",
                i = n + ".accessToken",
                s = n + ".refreshToken",
                o = n + ".clockDrift";
              if (this.storage.getItem(r)) {
                var a = new F({ IdToken: this.storage.getItem(r) }),
                  u = new _({ AccessToken: this.storage.getItem(i) }),
                  c = new M({ RefreshToken: this.storage.getItem(s) }),
                  h = parseInt(this.storage.getItem(o), 0) || 0,
                  f = new N({ IdToken: a, AccessToken: u, RefreshToken: c, ClockDrift: h });
                if (f.isValid()) return (this.signInUserSession = f), e(null, this.signInUserSession);
                if (!c.getToken()) return e(new Error("Cannot retrieve a new session. Please authenticate."), null);
                this.refreshSession(c, e, t.clientMetadata);
              } else e(new Error("Local storage is missing an ID Token, Please authenticate"), null);
            }),
            (t.refreshSession = function (e, t, n) {
              var r = this,
                i = this.pool.wrapRefreshSessionCallback ? this.pool.wrapRefreshSessionCallback(t) : t,
                s = {};
              s.REFRESH_TOKEN = e.getToken();
              var o = "CognitoIdentityServiceProvider." + this.pool.getClientId(),
                a = o + ".LastAuthUser";
              if (this.storage.getItem(a)) {
                this.username = this.storage.getItem(a);
                var u = o + "." + this.username + ".deviceKey";
                (this.deviceKey = this.storage.getItem(u)), (s.DEVICE_KEY = this.deviceKey);
              }
              var c = { ClientId: this.pool.getClientId(), AuthFlow: "REFRESH_TOKEN_AUTH", AuthParameters: s, ClientMetadata: n };
              this.getUserContextData() && (c.UserContextData = this.getUserContextData()),
                this.client.request("InitiateAuth", c, function (t, n) {
                  if (t) return "NotAuthorizedException" === t.code && r.clearCachedUser(), i(t, null);
                  if (n) {
                    var s = n.AuthenticationResult;
                    return Object.prototype.hasOwnProperty.call(s, "RefreshToken") || (s.RefreshToken = e.getToken()), (r.signInUserSession = r.getCognitoUserSession(s)), r.cacheTokens(), i(null, r.signInUserSession);
                  }
                });
            }),
            (t.cacheTokens = function () {
              var e = "CognitoIdentityServiceProvider." + this.pool.getClientId(),
                t = e + "." + this.username + ".idToken",
                n = e + "." + this.username + ".accessToken",
                r = e + "." + this.username + ".refreshToken",
                i = e + "." + this.username + ".clockDrift",
                s = e + ".LastAuthUser";
              this.storage.setItem(t, this.signInUserSession.getIdToken().getJwtToken()),
                this.storage.setItem(n, this.signInUserSession.getAccessToken().getJwtToken()),
                this.storage.setItem(r, this.signInUserSession.getRefreshToken().getToken()),
                this.storage.setItem(i, "" + this.signInUserSession.getClockDrift()),
                this.storage.setItem(s, this.username);
            }),
            (t.cacheUserData = function (e) {
              this.storage.setItem(this.userDataKey, JSON.stringify(e));
            }),
            (t.clearCachedUserData = function () {
              this.storage.removeItem(this.userDataKey);
            }),
            (t.clearCachedUser = function () {
              this.clearCachedTokens(), this.clearCachedUserData();
            }),
            (t.cacheDeviceKeyAndPassword = function () {
              var e = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username,
                t = e + ".deviceKey",
                n = e + ".randomPasswordKey",
                r = e + ".deviceGroupKey";
              this.storage.setItem(t, this.deviceKey), this.storage.setItem(n, this.randomPassword), this.storage.setItem(r, this.deviceGroupKey);
            }),
            (t.getCachedDeviceKeyAndPassword = function () {
              var e = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username,
                t = e + ".deviceKey",
                n = e + ".randomPasswordKey",
                r = e + ".deviceGroupKey";
              this.storage.getItem(t) && ((this.deviceKey = this.storage.getItem(t)), (this.randomPassword = this.storage.getItem(n)), (this.deviceGroupKey = this.storage.getItem(r)));
            }),
            (t.clearCachedDeviceKeyAndPassword = function () {
              var e = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username,
                t = e + ".deviceKey",
                n = e + ".randomPasswordKey",
                r = e + ".deviceGroupKey";
              this.storage.removeItem(t), this.storage.removeItem(n), this.storage.removeItem(r);
            }),
            (t.clearCachedTokens = function () {
              var e = "CognitoIdentityServiceProvider." + this.pool.getClientId(),
                t = e + "." + this.username + ".idToken",
                n = e + "." + this.username + ".accessToken",
                r = e + "." + this.username + ".refreshToken",
                i = e + ".LastAuthUser",
                s = e + "." + this.username + ".clockDrift";
              this.storage.removeItem(t), this.storage.removeItem(n), this.storage.removeItem(r), this.storage.removeItem(i), this.storage.removeItem(s);
            }),
            (t.getCognitoUserSession = function (e) {
              var t = new F(e),
                n = new _(e),
                r = new M(e);
              return new N({ IdToken: t, AccessToken: n, RefreshToken: r });
            }),
            (t.forgotPassword = function (e, t) {
              var n = { ClientId: this.pool.getClientId(), Username: this.username, ClientMetadata: t };
              this.getUserContextData() && (n.UserContextData = this.getUserContextData()),
                this.client.request("ForgotPassword", n, function (t, n) {
                  return t ? e.onFailure(t) : "function" == typeof e.inputVerificationCode ? e.inputVerificationCode(n) : e.onSuccess(n);
                });
            }),
            (t.confirmPassword = function (e, t, n, r) {
              var i = { ClientId: this.pool.getClientId(), Username: this.username, ConfirmationCode: e, Password: t, ClientMetadata: r };
              this.getUserContextData() && (i.UserContextData = this.getUserContextData()),
                this.client.request("ConfirmForgotPassword", i, function (e) {
                  return e ? n.onFailure(e) : n.onSuccess("SUCCESS");
                });
            }),
            (t.getAttributeVerificationCode = function (e, t, n) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return t.onFailure(new Error("User is not authenticated"));
              this.client.request("GetUserAttributeVerificationCode", { AttributeName: e, AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), ClientMetadata: n }, function (e, n) {
                return e ? t.onFailure(e) : "function" == typeof t.inputVerificationCode ? t.inputVerificationCode(n) : t.onSuccess("SUCCESS");
              });
            }),
            (t.verifyAttribute = function (e, t, n) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return n.onFailure(new Error("User is not authenticated"));
              this.client.request("VerifyUserAttribute", { AttributeName: e, Code: t, AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (e) {
                return e ? n.onFailure(e) : n.onSuccess("SUCCESS");
              });
            }),
            (t.getDevice = function (e) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e.onFailure(new Error("User is not authenticated"));
              this.client.request("GetDevice", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), DeviceKey: this.deviceKey }, function (t, n) {
                return t ? e.onFailure(t) : e.onSuccess(n);
              });
            }),
            (t.forgetSpecificDevice = function (e, t) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return t.onFailure(new Error("User is not authenticated"));
              this.client.request("ForgetDevice", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), DeviceKey: e }, function (e) {
                return e ? t.onFailure(e) : t.onSuccess("SUCCESS");
              });
            }),
            (t.forgetDevice = function (e) {
              var t = this;
              this.forgetSpecificDevice(this.deviceKey, {
                onFailure: e.onFailure,
                onSuccess: function (n) {
                  return (t.deviceKey = null), (t.deviceGroupKey = null), (t.randomPassword = null), t.clearCachedDeviceKeyAndPassword(), e.onSuccess(n);
                },
              });
            }),
            (t.setDeviceStatusRemembered = function (e) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e.onFailure(new Error("User is not authenticated"));
              this.client.request("UpdateDeviceStatus", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), DeviceKey: this.deviceKey, DeviceRememberedStatus: "remembered" }, function (t) {
                return t ? e.onFailure(t) : e.onSuccess("SUCCESS");
              });
            }),
            (t.setDeviceStatusNotRemembered = function (e) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e.onFailure(new Error("User is not authenticated"));
              this.client.request("UpdateDeviceStatus", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), DeviceKey: this.deviceKey, DeviceRememberedStatus: "not_remembered" }, function (t) {
                return t ? e.onFailure(t) : e.onSuccess("SUCCESS");
              });
            }),
            (t.listDevices = function (e, t, n) {
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return n.onFailure(new Error("User is not authenticated"));
              var r = { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), Limit: e };
              t && (r.PaginationToken = t),
                this.client.request("ListDevices", r, function (e, t) {
                  return e ? n.onFailure(e) : n.onSuccess(t);
                });
            }),
            (t.globalSignOut = function (e) {
              var t = this;
              if (null == this.signInUserSession || !this.signInUserSession.isValid()) return e.onFailure(new Error("User is not authenticated"));
              this.client.request("GlobalSignOut", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (n) {
                return n ? e.onFailure(n) : (t.clearCachedUser(), e.onSuccess("SUCCESS"));
              });
            }),
            (t.signOut = function (e) {
              var t = this;
              e && "function" == typeof e
                ? this.getSession(function (n, r) {
                  if (n) return e(n);
                  t.revokeTokens(function (n) {
                    t.cleanClientData(), e(n);
                  });
                })
                : this.cleanClientData();
            }),
            (t.revokeTokens = function (e) {
              if ((void 0 === e && (e = function () { }), "function" != typeof e)) throw new Error("Invalid revokeTokenCallback. It should be a function.");
              if (!this.signInUserSession) return e(new Error("User is not authenticated"));
              if (!this.signInUserSession.getAccessToken()) return e(new Error("No Access token available"));
              var t = this.signInUserSession.getRefreshToken().getToken(),
                n = this.signInUserSession.getAccessToken();
              if (this.isSessionRevocable(n) && t) return this.revokeToken({ token: t, callback: e });
              e();
            }),
            (t.isSessionRevocable = function (e) {
              if (e && "function" == typeof e.decodePayload)
                try {
                  return !!e.decodePayload().origin_jti;
                } catch (e) { }
              return !1;
            }),
            (t.cleanClientData = function () {
              (this.signInUserSession = null), this.clearCachedUser();
            }),
            (t.revokeToken = function (e) {
              var t = e.token,
                n = e.callback;
              this.client.requestWithRetry("RevokeToken", { Token: t, ClientId: this.pool.getClientId() }, function (e) {
                if (e) return n(e);
                n();
              });
            }),
            (t.sendMFASelectionAnswer = function (e, t) {
              var n = this,
                r = {};
              (r.USERNAME = this.username), (r.ANSWER = e);
              var i = { ChallengeName: "SELECT_MFA_TYPE", ChallengeResponses: r, ClientId: this.pool.getClientId(), Session: this.Session };
              this.getUserContextData() && (i.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", i, function (r, i) {
                  return r
                    ? t.onFailure(r)
                    : ((n.Session = i.Session), "SMS_MFA" === e ? t.mfaRequired(i.ChallengeName, i.ChallengeParameters) : "SOFTWARE_TOKEN_MFA" === e ? t.totpRequired(i.ChallengeName, i.ChallengeParameters) : void 0);
                });
            }),
            (t.getUserContextData = function () {
              return this.pool.getUserContextData(this.username);
            }),
            (t.associateSoftwareToken = function (e) {
              var t = this;
              null != this.signInUserSession && this.signInUserSession.isValid()
                ? this.client.request("AssociateSoftwareToken", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken() }, function (t, n) {
                  return t ? e.onFailure(t) : e.associateSecretCode(n.SecretCode);
                })
                : this.client.request("AssociateSoftwareToken", { Session: this.Session }, function (n, r) {
                  return n ? e.onFailure(n) : ((t.Session = r.Session), e.associateSecretCode(r.SecretCode));
                });
            }),
            (t.verifySoftwareToken = function (e, t, n) {
              var r = this;
              null != this.signInUserSession && this.signInUserSession.isValid()
                ? this.client.request("VerifySoftwareToken", { AccessToken: this.signInUserSession.getAccessToken().getJwtToken(), UserCode: e, FriendlyDeviceName: t }, function (e, t) {
                  return e ? n.onFailure(e) : n.onSuccess(t);
                })
                : this.client.request("VerifySoftwareToken", { Session: this.Session, UserCode: e, FriendlyDeviceName: t }, function (e, t) {
                  if (e) return n.onFailure(e);
                  r.Session = t.Session;
                  var i = {};
                  i.USERNAME = r.username;
                  var s = { ChallengeName: "MFA_SETUP", ClientId: r.pool.getClientId(), ChallengeResponses: i, Session: r.Session };
                  r.getUserContextData() && (s.UserContextData = r.getUserContextData()),
                    r.client.request("RespondToAuthChallenge", s, function (e, t) {
                      return e ? n.onFailure(e) : ((r.signInUserSession = r.getCognitoUserSession(t.AuthenticationResult)), r.cacheTokens(), n.onSuccess(r.signInUserSession));
                    });
                });
            }),
            e
          );
        })(),
        z = (n(204), "aws-amplify/5.0.4"),
        G = { userAgent: z + " js", product: "", navigator: null, isReactNative: !1 };
      function Z() { }
      "undefined" != typeof navigator &&
        navigator.product &&
        ((G.product = navigator.product || ""),
          (G.navigator = navigator || null),
          "ReactNative" === navigator.product ? ((G.userAgent = z + " react-native"), (G.isReactNative = !0)) : ((G.userAgent = z + " js"), (G.isReactNative = !1))),
        (Z.prototype.userAgent = G.userAgent);
      const X = Z;
      function $(e) {
        var t = "function" == typeof Map ? new Map() : void 0;
        return (
          ($ = function (e) {
            if (null === e || ((n = e), -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
            var n;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
              if (t.has(e)) return t.get(e);
              t.set(e, r);
            }
            function r() {
              return Q(e, arguments, ne(this).constructor);
            }
            return (r.prototype = Object.create(e.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } })), te(r, e);
          }),
          $(e)
        );
      }
      function Q(e, t, n) {
        return (
          (Q = ee()
            ? Reflect.construct.bind()
            : function (e, t, n) {
              var r = [null];
              r.push.apply(r, t);
              var i = new (Function.bind.apply(e, r))();
              return n && te(i, n.prototype), i;
            }),
          Q.apply(null, arguments)
        );
      }
      function ee() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0;
        } catch (e) {
          return !1;
        }
      }
      function te(e, t) {
        return (
          (te = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
              return (e.__proto__ = t), e;
            }),
          te(e, t)
        );
      }
      function ne(e) {
        return (
          (ne = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            }),
          ne(e)
        );
      }
      var re = (function (e) {
        function t(t, n, r, i) {
          var s;
          return ((s = e.call(this, t) || this).code = n), (s.name = r), (s.statusCode = i), s;
        }
        return (r = e), ((n = t).prototype = Object.create(r.prototype)), (n.prototype.constructor = n), te(n, r), t;
        var n, r;
      })($(Error)),
        ie = (function () {
          function e(e, t, n) {
            this.endpoint = t || "https://cognito-idp." + e + ".amazonaws.com/";
            var r = (n || {}).credentials;
            this.fetchOptions = r ? { credentials: r } : {};
          }
          var t = e.prototype;
          return (
            (t.promisifyRequest = function (e, t) {
              var n = this;
              return new Promise(function (r, i) {
                n.request(e, t, function (e, t) {
                  e ? i(new re(e.message, e.code, e.name, e.statusCode)) : r(t);
                });
              });
            }),
            (t.requestWithRetry = function (e, t, n) {
              var r,
                i,
                s = this;
              ((r = [t]),
                (i = 5e3),
                void 0 === i && (i = oe),
                se(
                  function (t) {
                    return new Promise(function (n, r) {
                      s.request(e, t, function (e, t) {
                        e ? r(e) : n(t);
                      });
                    });
                  },
                  r,
                  (function (e) {
                    return function (t) {
                      var n = 100 * Math.pow(2, t) + 100 * Math.random();
                      return !(n > e) && n;
                    };
                  })(i)
                ))
                .then(function (e) {
                  return n(null, e);
                })
                .catch(function (e) {
                  return n(e);
                });
            }),
            (t.request = function (e, t, n) {
              var r,
                i = { "Content-Type": "application/x-amz-json-1.1", "X-Amz-Target": "AWSCognitoIdentityProviderService." + e, "X-Amz-User-Agent": X.prototype.userAgent },
                s = Object.assign({}, this.fetchOptions, { headers: i, method: "POST", mode: "cors", cache: "no-cache", body: JSON.stringify(t) });
              fetch(this.endpoint, s)
                .then(
                  function (e) {
                    return (r = e), e;
                  },
                  function (e) {
                    if (e instanceof TypeError) throw new Error("Network error");
                    throw e;
                  }
                )
                .then(function (e) {
                  return e.json().catch(function () {
                    return {};
                  });
                })
                .then(function (e) {
                  if (r.ok) return n(null, e);
                  var t = (e.__type || e.code).split("#").pop(),
                    i = new Error(e.message || e.Message || null);
                  return (i.name = t), (i.code = t), n(i);
                })
                .catch(function (e) {
                  if (r && r.headers && r.headers.get("x-amzn-errortype"))
                    try {
                      var t = r.headers.get("x-amzn-errortype").split(":")[0],
                        i = new Error(r.status ? r.status.toString() : null);
                      return (i.code = t), (i.name = t), (i.statusCode = r.status), n(i);
                    } catch (t) {
                      return n(e);
                    }
                  else e instanceof Error && "Network error" === e.message && (e.code = "NetworkError");
                  return n(e);
                });
            }),
            e
          );
        })();
      function se(e, t, n, r) {
        if ((void 0 === r && (r = 1), "function" != typeof e)) throw Error("functionToRetry must be a function");
        return (
          e.name,
          JSON.stringify(t),
          e.apply(void 0, t).catch(function (i) {
            if ((e.name, (s = i) && s.nonRetryable)) throw (e.name, i);
            var s,
              o = n(r, t, i);
            if ((e.name, !1 !== o))
              return new Promise(function (e) {
                return setTimeout(e, o);
              }).then(function () {
                return se(e, t, n, r + 1);
              });
            throw i;
          })
        );
      }
      Error;
      var oe = 3e5,
        ae = (function () {
          function e(e, t) {
            var n = e || {},
              r = n.UserPoolId,
              i = n.ClientId,
              s = n.endpoint,
              o = n.fetchOptions,
              a = n.AdvancedSecurityDataCollectionFlag;
            if (!r || !i) throw new Error("Both UserPoolId and ClientId are required.");
            if (r.length > 55 || !/^[\w-]+_[0-9a-zA-Z]+$/.test(r)) throw new Error("Invalid UserPoolId format.");
            var u = r.split("_")[0];
            (this.userPoolId = r),
              (this.clientId = i),
              (this.client = new ie(u, s, o)),
              (this.advancedSecurityDataCollectionFlag = !1 !== a),
              (this.storage = e.Storage || new j().getStorage()),
              t && (this.wrapRefreshSessionCallback = t);
          }
          var t = e.prototype;
          return (
            (t.getUserPoolId = function () {
              return this.userPoolId;
            }),
            (t.getUserPoolName = function () {
              return this.getUserPoolId().split("_")[1];
            }),
            (t.getClientId = function () {
              return this.clientId;
            }),
            (t.signUp = function (e, t, n, r, i, s) {
              var o = this,
                a = { ClientId: this.clientId, Username: e, Password: t, UserAttributes: n, ValidationData: r, ClientMetadata: s };
              this.getUserContextData(e) && (a.UserContextData = this.getUserContextData(e)),
                this.client.request("SignUp", a, function (t, n) {
                  if (t) return i(t, null);
                  var r = { Username: e, Pool: o, Storage: o.storage },
                    s = { user: new J(r), userConfirmed: n.UserConfirmed, userSub: n.UserSub, codeDeliveryDetails: n.CodeDeliveryDetails };
                  return i(null, s);
                });
            }),
            (t.getCurrentUser = function () {
              var e = "CognitoIdentityServiceProvider." + this.clientId + ".LastAuthUser",
                t = this.storage.getItem(e);
              if (t) {
                var n = { Username: t, Pool: this, Storage: this.storage };
                return new J(n);
              }
              return null;
            }),
            (t.getUserContextData = function (e) {
              if ("undefined" != typeof AmazonCognitoAdvancedSecurityData) {
                var t = AmazonCognitoAdvancedSecurityData;
                if (this.advancedSecurityDataCollectionFlag) {
                  var n = t.getData(e, this.userPoolId, this.clientId);
                  if (n) return { EncodedData: n };
                }
                return {};
              }
            }),
            e
          );
        })();
      n(6808);
      const ue = new ae({ UserPoolId: "eu-west-2_q0ahsw0cb", ClientId: "6pk2jejpsgkt00bivjuel6g978", Storage: t }),
        ce = document.getElementById("auth-form");
      ce &&
        ce.addEventListener("submit", function (e) {
          try {
            const s = new FormData(e.currentTarget);
            var n = { Username: s.get("username"), Password: s.get("password") },
              r = new i(n);
            const o = { Username: s.get("username"), Pool: ue, Storage: t },
              a = new J(o);
            a.authenticateUser(r, {
              onSuccess: function (e) {
                const t = new F({ IdToken: e.getIdToken().getJwtToken() }),
                  n = new M({ RefreshToken: e.getRefreshToken().getToken() }),
                  r = new _({ AccessToken: e.getAccessToken().getJwtToken() }),
                  i = new N({ IdToken: t, RefreshToken: n, AccessToken: r });
                a.setSignInUserSession(i);
              },
              onFailure: function (e) {
                console.log(e.message || JSON.stringify(e));
              },
            });
          } catch (e) { }
        });
    })();
})();
