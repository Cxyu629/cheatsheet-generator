# CS1101S Midterms

By: cxy

## Substitution model

Applicative order reduction

- Evaluates innermost expression(s) before applying outer function(s)

```javascript
add_squares(sq(1 + 2), sq(3 + 4));
add_squares(sq(3), sq(7));
add_squares(3 * 3, 7 * 7);
add_squares(9, 49);
9 + 49;
58;
```

Normal order reduction

- Applies outermost function before evaluating inner expression(s)

## Recursive v.s. Iterative

Recursive is a process that builds up a chain of deferred operations.

Iterative is a process that does not "grow" or "shrink", i.e. the deferred operations do not increase as problem size increases. 

The `$\sum$` function below is an example of a recursive process.

```latex
\text{Hi} \\
\sum^n_{k = 1} \frac{1}{k}
```

## Scope

Forms of declarations

- Pre-declared names
- Constant declarations
- Parameters of function declarations and lambda expressions
- Function names of function declarations

Scoping rule: a name refers to its _closest surrounding_ declaration
