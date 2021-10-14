(() => {
    const line1 = () => {
        return 'line 1\n'
    }
    return line1() + 'line 2'
})()