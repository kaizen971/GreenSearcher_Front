# This is a comment.

# This is the default target.
all: myprogram

# This rule says that the "myprogram" target depends on the
# "main.o" and "hello.o" files.
myprogram: main.o hello.o
    gcc -o myprogram main.o hello.o

# This rule says that the "main.o" target depends on the
# "main.c" file.
main.o: main.c
    gcc -c main.c

# This rule says that the "hello.o" target depends on the
# "hello.c" file.
hello.o: hello.c
    gcc -c hello.c
