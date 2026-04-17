module.exports = {
    apps: [{
        name: 'cvenom-landing',
        script: 'npm',
        args: 'start',
        instances: 1,
        exec_mode: 'fork',
        env: {
            NODE_ENV: 'production',
            PORT: 4004,
            CONFIG_PATH: './config.yaml'
        },
        error_file: './logs/cvenom-landing-error.log',
        out_file: './logs/cvenom-landing-out.log',
        log_file: './logs/cvenom-landing-combined.log',
        time: true,
        max_memory_restart: '500M'
    }]
};
