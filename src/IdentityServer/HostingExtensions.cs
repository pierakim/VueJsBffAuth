using Duende.IdentityServer;
using IdentityServerHost;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace IdentityServer;

internal static class HostingExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddRazorPages();

        builder.Services.AddIdentityServer()
            .AddInMemoryIdentityResources(Config.IdentityResources)
            .AddInMemoryApiScopes(Config.ApiScopes)
            .AddInMemoryClients(Config.Clients)
            .AddTestUsers(TestUsers.Users);

        builder.Services.AddAuthentication()
            .AddGoogle("Google", options =>
            {
                options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
                options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
            })
            .AddOpenIdConnect("oidc", "Demo IdentityServer", options =>
            {
                options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                options.SignOutScheme = IdentityServerConstants.SignoutScheme;
                options.SaveTokens = true;

                //options.Authority = "https://demo.duendesoftware.com";
                options.Authority = "https://localhost:5001";
                options.ClientId = "interactive.confidential";
                options.ClientSecret = "secret";
                options.ResponseType = "code";

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = "name",
                    RoleClaimType = "role"
                };
            });

        var apiCorsPolicy = "ApiCorsPolicy";
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: apiCorsPolicy,
                              builder =>
                              {
                                  builder.WithOrigins("https://localhost:7051")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                                    //.AllowCredentials();
                              //.WithMethods("OPTIONS", "GET");
                          });
        });

        return builder.Build();
    }
    
    public static WebApplication ConfigurePipeline(this WebApplication app)
    { 
        app.UseSerilogRequestLogging();
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseStaticFiles();
        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseCors();

        app.UseCors(
            options => options.WithOrigins("https://localhost:7051")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials()
             );

        app.UseIdentityServer();

        app.UseAuthorization();
        app.MapRazorPages().RequireAuthorization();

        return app;
    }
}